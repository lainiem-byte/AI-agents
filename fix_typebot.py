"""Fix Typebot audit flow: remove broken Sheet/Gmail blocks, add webhooks, fix variables, add booking."""
import json

with open('typebot-audit-flow-lnl.json', 'r') as f:
    tb = json.load(f)

# 1. ADD NEW VARIABLES
new_vars = [
    {'id': 'v_customer_name_001', 'name': 'customer_name', 'isSessionVariable': False},
    {'id': 'v_customer_email_001', 'name': 'customer_email', 'isSessionVariable': False},
    {'id': 'v_source_path_001', 'name': 'source_path', 'isSessionVariable': True},
]
tb['variables'] = [v for v in tb['variables'] if v['id'] != 'vfg4h976nmqea7flscj68jbic']
tb['variables'].extend(new_vars)

# 2. REMOVE GOOGLE SHEETS + GMAIL BLOCKS
blocks_to_remove = set()
for group in tb['groups']:
    for block in group['blocks']:
        if block.get('type') in ('Google Sheets', 'gmail'):
            blocks_to_remove.add(block['id'])

print(f'Removing {len(blocks_to_remove)} Google Sheets/Gmail blocks')

for group in tb['groups']:
    group['blocks'] = [b for b in group['blocks'] if b['id'] not in blocks_to_remove]

tb['edges'] = [
    e for e in tb['edges']
    if e.get('from', {}).get('blockId') not in blocks_to_remove
    and e.get('to', {}).get('blockId') not in blocks_to_remove
]

# 3. FIX VARIABLE ASSIGNMENTS IN INPUT BLOCKS
OLD_VAR = 'vfg4h976nmqea7flscj68jbic'
for group in tb['groups']:
    for block in group['blocks']:
        if block.get('type') == 'text input':
            opts = block.get('options', {})
            if opts.get('variableId') == OLD_VAR:
                placeholder = opts.get('labels', {}).get('placeholder', '')
                if 'name' in placeholder.lower():
                    opts['variableId'] = 'v_customer_name_001'
                    print(f'  Fixed name input: {block["id"]}')
        elif block.get('type') == 'email input':
            opts = block.get('options', {})
            if opts.get('variableId') == OLD_VAR:
                opts['variableId'] = 'v_customer_email_001'
                print(f'  Fixed email input: {block["id"]}')

# Also fix the "Has Questions - No" group name input (block vnavj0zajh0bzenob964lkt9)
# and email input (block gqogmmyussio42pid2nup3i6) which don't have "name" in placeholder
for group in tb['groups']:
    if group['id'] == 'iwzdg526ds7a31cgcoyi3iyc':
        for block in group['blocks']:
            if block['id'] == 'vnavj0zajh0bzenob964lkt9':
                block.setdefault('options', {})['variableId'] = 'v_customer_name_001'
                print(f'  Fixed No-Q name input: {block["id"]}')
            elif block['id'] == 'gqogmmyussio42pid2nup3i6':
                block.setdefault('options', {})['variableId'] = 'v_customer_email_001'
                print(f'  Fixed No-Q email input: {block["id"]}')
    # Question group (cl96og2yr001v3b6ivhzb1x34) - name and email
    elif group['id'] == 'cl96og2yr001v3b6ivhzb1x34':
        for block in group['blocks']:
            if block['id'] == 'y8corzn9bky4y0wgx8kukjc1':  # text input for name
                block.setdefault('options', {})['variableId'] = 'v_customer_name_001'
                print(f'  Fixed Question name input: {block["id"]}')
            elif block['id'] == 'qciy318vgsf9wbhb2ujcgjn1':  # email input
                block.setdefault('options', {})['variableId'] = 'v_customer_email_001'
                print(f'  Fixed Question email input: {block["id"]}')

# 4. ADD WEBHOOK BLOCKS
def make_webhook_block(block_id, source_path_value):
    return {
        'id': block_id,
        'type': 'Webhook',
        'options': {
            'url': 'https://n8n.srv1244684.hstgr.cloud/webhook/typebot-lead-capture',
            'method': 'POST',
            'body': {
                'customer_name': '{{customer_name}}',
                'customer_email': '{{customer_email}}',
                'source_path': source_path_value,
                'creatives_q1_revenue': '{{ creatives_q1_revenue}}',
                'creatives_q2_challenge': '{{creatives_q2_challenge}}',
                'creatives_q3_timeline': '{{creatives_q3_timeline}}',
                'creatives_q4_authority': '{{creatives_q4_authority}}',
                'automations_q1_revenue': '{{automations_q1_revenue}}',
                'automations_q2_bottleneck': '{{automations_q2_bottleneck}}',
                'automations_q3_timeline': '{{automations_q3_timeline}}',
                'automations_q4_goals': '{{automations_q4_goals}}',
                'timestamp': '{{@system.currentDate}}'
            }
        }
    }

for group in tb['groups']:
    if group['id'] == 'afnl6gyrsm2ejm1gcar4qczx':
        group['blocks'].append(make_webhook_block('webhook_creatives_001', 'creatives_questionnaire'))
        print('Added webhook to Creatives questionnaire')
    elif group['id'] == 'atzztq3dn0p7drr372k9j3jh':
        group['blocks'].append(make_webhook_block('webhook_automations_001', 'automations_questionnaire'))
        print('Added webhook to Automations questionnaire')
    elif group['id'] == 'iwzdg526ds7a31cgcoyi3iyc':
        group['blocks'].append(make_webhook_block('webhook_no_questions_001', 'no_questions'))
        print('Added webhook to No Questions path')

# 5. ADD BOOKING GROUP + MAIN MENU OPTION
booking_group = {
    'id': 'group_booking_001',
    'title': 'Book a Strategy Call',
    'graphCoordinates': {'x': 800, 'y': 1100},
    'blocks': [
        {
            'id': 'block_booking_text_001',
            'type': 'text',
            'content': {
                'richText': [
                    {'id': 'rt_booking_001', 'type': 'p', 'children': [
                        {'bold': True, 'text': 'Ready to see your custom growth blueprint?'},
                    ]},
                    {'id': 'rt_booking_002', 'type': 'p', 'children': [
                        {'text': "Book a free 30-minute Strategy Session with our team. We'll walk through your current systems, identify the biggest growth levers, and show you exactly what an LNL engagement looks like for your business."},
                    ]}
                ]
            }
        },
        {
            'id': 'block_booking_redirect_001',
            'type': 'Redirect',
            'options': {
                'url': '{{BOOKING_URL}}',
                'isNewTab': True
            }
        },
        {
            'id': 'block_booking_followup_001',
            'type': 'text',
            'content': {
                'richText': [
                    {'id': 'rt_booking_003', 'type': 'p', 'children': [
                        {'text': "The booking page should have opened in a new tab. If it didn't, you can reach us at hello@lnlgroups.com"},
                    ]}
                ]
            }
        }
    ]
}
tb['groups'].append(booking_group)

# Add booking choice to main menu
for group in tb['groups']:
    if group['id'] == 'cl96ns9qr00043b6ii07bo25o':
        for block in group['blocks']:
            if block['id'] == 'cl96nv877000b3b6i7p69ss2o':
                block['items'].append({
                    'id': 'item_booking_001',
                    'outgoingEdgeId': 'edge_to_booking_001',
                    'content': 'Book a Strategy Call'
                })
                print('Added booking option to main menu')

tb['edges'].append({
    'id': 'edge_to_booking_001',
    'from': {'blockId': 'cl96nv877000b3b6i7p69ss2o', 'itemId': 'item_booking_001'},
    'to': {'groupId': 'group_booking_001'}
})

# 6. ADD BOOKING CTA AT END OF QUESTIONNAIRES
cta_text = "Want to skip the wait? Book a free Strategy Session now and we'll walk through your custom blueprint together."

for group in tb['groups']:
    if group['id'] in ('afnl6gyrsm2ejm1gcar4qczx', 'atzztq3dn0p7drr372k9j3jh'):
        suffix = 'c' if 'afnl' in group['id'] else 'a'
        group['blocks'].append({
            'id': f'block_booking_cta_{suffix}',
            'type': 'text',
            'content': {
                'richText': [
                    {'id': f'rt_cta_{suffix}1', 'type': 'p', 'children': [
                        {'text': cta_text},
                    ]}
                ]
            }
        })

# 7. ADD BOOKING_URL VARIABLE
tb['variables'].append({
    'id': 'v_booking_url_001',
    'name': 'BOOKING_URL',
    'isSessionVariable': True,
    'value': ''  # Will be set when Google Calendar appointment schedule is created
})

# WRITE
with open('typebot-audit-flow-lnl.json', 'w') as f:
    json.dump(tb, f)

print('\n=== DONE ===')
print(f'Variables: {len(tb["variables"])}')
print(f'Groups: {len(tb["groups"])}')
print(f'Edges: {len(tb["edges"])}')
total_blocks = sum(len(g['blocks']) for g in tb['groups'])
print(f'Total blocks: {total_blocks}')
