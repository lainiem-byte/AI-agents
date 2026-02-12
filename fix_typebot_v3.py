"""
Typebot Flow Fix v3 - Eliminate Dead Ends & Add Booking CTAs Everywhere

Fixes:
1. Replace 3 "Cool!" dead-end buttons with meaningful navigation + booking
   - About LNL Creatives: "Cool!" -> "Book a Strategy Call" / "Explore Services" / "Back to Main Menu"
   - About LNL Automations: "Cool!" -> "Book a Strategy Call" / "Explore Services" / "Back to Main Menu"
   - About The LNL Group: "Cool!" -> "Book a Strategy Call" / "Explore a Division" / "I Have a Question"
2. Remove the broken "Cool!" in Audit Process group (it blocks the working choice below)
3. Add booking choice buttons at end of both questionnaires (replace dead-end text)
4. Add booking choice at end of "Has Questions - No" path
5. Fix "Question" group dead end - add navigation after question input
6. Add booking option to both sub-menus (Creatives & Automations)
7. Fix "Book a Strategy Call" group dead end - add navigation after followup text
8. Add "Book a Strategy Call" option to "Yes, let's do it!" / "Not yet" choice blocks
"""

import json
import copy
import uuid

def gen_id():
    return uuid.uuid4().hex[:24]

with open('typebot-audit-flow-lnl.json', encoding='utf-8') as f:
    data = json.load(f)

# Helper: find group by id
def find_group(gid):
    for g in data['groups']:
        if g['id'] == gid:
            return g
    return None

# Helper: find block index in group
def find_block_idx(group, block_id):
    for i, b in enumerate(group['blocks']):
        if b['id'] == block_id:
            return i
    return -1

# Helper: add edge
def add_edge(from_block, from_item, to_group, to_block=None):
    eid = gen_id()
    edge = {
        "id": eid,
        "from": {"blockId": from_block, "itemId": from_item},
        "to": {"groupId": to_group}
    }
    if to_block:
        edge["to"]["blockId"] = to_block
    data['edges'].append(edge)
    return eid

# Helper: remove edges from a specific block
def remove_edges_from_block(block_id):
    data['edges'] = [e for e in data['edges'] if e.get('from', {}).get('blockId') != block_id]

# Helper: create a choice input block with items
def make_choice_block(block_id, items):
    """items = list of (item_id, content)"""
    return {
        "id": block_id,
        "type": "choice input",
        "items": [
            {"id": iid, "content": content}
            for iid, content in items
        ],
        "options": {
            "isMultipleChoice": False,
            "buttonLabel": "Send",
            "dynamicVariableId": None,
            "isSearchable": False,
            "searchInputPlaceholder": "Filter the options..."
        }
    }

# ============================================================
# FIX 1: Replace "Cool!" in About LNL Creatives
# ============================================================
print("FIX 1: About LNL Creatives - replace Cool! with navigation")
g = find_group('cl96oc274001m3b6ig3beli9v')
# Find and replace the Cool! choice block
for i, b in enumerate(g['blocks']):
    if b['id'] == 'cl96oftnv001r3b6ixen8g0bv':
        item_book = gen_id()
        item_explore = gen_id()
        item_main = gen_id()
        g['blocks'][i] = make_choice_block('cl96oftnv001r3b6ixen8g0bv', [
            (item_book, "Book a Strategy Call"),
            (item_explore, "Explore Our Services"),
            (item_main, "Back to Main Menu"),
        ])
        # Remove old edges, add new ones
        remove_edges_from_block('cl96oftnv001r3b6ixen8g0bv')
        add_edge('cl96oftnv001r3b6ixen8g0bv', item_book, 'group_booking_001')
        add_edge('cl96oftnv001r3b6ixen8g0bv', item_explore, 'mevgkav7jwboywm6jlwl4g3c')
        add_edge('cl96oftnv001r3b6ixen8g0bv', item_main, 'cl96ns9qr00043b6ii07bo25o')
        # Remove the Jump block after it (now unreachable/unnecessary)
        g['blocks'] = [b for b in g['blocks'] if b['id'] != 'js5pbqj76g67yvs6wz99rcbm']
        break

# ============================================================
# FIX 2: Replace "Cool!" in About LNL Automations
# ============================================================
print("FIX 2: About LNL Automations - replace Cool! with navigation")
g = find_group('zg6373okaruw1u6sy8hwoxki')
for i, b in enumerate(g['blocks']):
    if b['id'] == 'ilcle7sq3mbayvj3uz8mailf':
        item_book = gen_id()
        item_explore = gen_id()
        item_main = gen_id()
        g['blocks'][i] = make_choice_block('ilcle7sq3mbayvj3uz8mailf', [
            (item_book, "Book a Strategy Call"),
            (item_explore, "Explore Our Services"),
            (item_main, "Back to Main Menu"),
        ])
        remove_edges_from_block('ilcle7sq3mbayvj3uz8mailf')
        add_edge('ilcle7sq3mbayvj3uz8mailf', item_book, 'group_booking_001')
        add_edge('ilcle7sq3mbayvj3uz8mailf', item_explore, 'bvlkqc1ba0nvr6q9twy3t0fa')
        add_edge('ilcle7sq3mbayvj3uz8mailf', item_main, 'cl96ns9qr00043b6ii07bo25o')
        g['blocks'] = [b for b in g['blocks'] if b['id'] != 'rqayddi4qweeflrhhgl68qb1']
        break

# ============================================================
# FIX 3: Replace "Cool!" in About The LNL Group
# ============================================================
print("FIX 3: About The LNL Group - replace Cool! with navigation")
g = find_group('p4e2e7mo47g7i0zkrc2vbgo8')
for i, b in enumerate(g['blocks']):
    if b['id'] == 'ts0ufatlbt0g1w0kisqq6a7p':
        item_book = gen_id()
        item_creative = gen_id()
        item_auto = gen_id()
        item_question = gen_id()
        g['blocks'][i] = make_choice_block('ts0ufatlbt0g1w0kisqq6a7p', [
            (item_book, "Book a Strategy Call"),
            (item_creative, "Tell me about LNL Creatives"),
            (item_auto, "Tell me about LNL Automations"),
            (item_question, "I have a question"),
        ])
        remove_edges_from_block('ts0ufatlbt0g1w0kisqq6a7p')
        add_edge('ts0ufatlbt0g1w0kisqq6a7p', item_book, 'group_booking_001')
        add_edge('ts0ufatlbt0g1w0kisqq6a7p', item_creative, 'mevgkav7jwboywm6jlwl4g3c')
        add_edge('ts0ufatlbt0g1w0kisqq6a7p', item_auto, 'bvlkqc1ba0nvr6q9twy3t0fa')
        add_edge('ts0ufatlbt0g1w0kisqq6a7p', item_question, 'cl96og2yr001v3b6ivhzb1x34')
        g['blocks'] = [b for b in g['blocks'] if b['id'] != 'a404atewmlgis3y9g0e21v3x']
        break

# ============================================================
# FIX 4: Remove "Cool!" from Audit Process (it blocks the working choice below)
# ============================================================
print("FIX 4: Audit Process - remove blocking Cool! button")
g = find_group('qrpnvsf60axuc7owmyxokz1n')
g['blocks'] = [b for b in g['blocks'] if b['id'] != 'mbfx330eytgf5nh1z2myfhe2']

# ============================================================
# FIX 5: Add booking choice at end of Creatives Questionnaire
# ============================================================
print("FIX 5: Creatives Questionnaire - add booking buttons at end")
g = find_group('afnl6gyrsm2ejm1gcar4qczx')
# Replace the text-only CTA with a choice block
for i, b in enumerate(g['blocks']):
    if b['id'] == 'block_booking_cta_c':
        item_book = gen_id()
        item_menu = gen_id()
        item_done = gen_id()
        g['blocks'][i] = make_choice_block('block_booking_cta_c', [
            (item_book, "Book a Strategy Session"),
            (item_menu, "Explore More Services"),
            (item_done, "I'm all set, thanks!"),
        ])
        add_edge('block_booking_cta_c', item_book, 'group_booking_001')
        add_edge('block_booking_cta_c', item_menu, 'cl96ns9qr00043b6ii07bo25o')
        # For "I'm all set" - add a thank you text group
        break

# ============================================================
# FIX 6: Add booking choice at end of Automations Questionnaire
# ============================================================
print("FIX 6: Automations Questionnaire - add booking buttons at end")
g = find_group('atzztq3dn0p7drr372k9j3jh')
for i, b in enumerate(g['blocks']):
    if b['id'] == 'block_booking_cta_a':
        item_book = gen_id()
        item_menu = gen_id()
        item_done = gen_id()
        g['blocks'][i] = make_choice_block('block_booking_cta_a', [
            (item_book, "Book a Strategy Session"),
            (item_menu, "Explore More Services"),
            (item_done, "I'm all set, thanks!"),
        ])
        add_edge('block_booking_cta_a', item_book, 'group_booking_001')
        add_edge('block_booking_cta_a', item_menu, 'cl96ns9qr00043b6ii07bo25o')
        break

# ============================================================
# FIX 7: Create a "Thank You" end group for graceful exit
# ============================================================
print("FIX 7: Create Thank You group")
thankyou_group_id = gen_id()
thankyou_block_id = gen_id()
data['groups'].append({
    "id": thankyou_group_id,
    "title": "Thank You",
    "graphCoordinates": {"x": 2800, "y": 600},
    "blocks": [
        {
            "id": thankyou_block_id,
            "type": "text",
            "content": {
                "richText": [
                    {"type": "p", "children": [
                        {"text": "Thanks for chatting with us! "},
                        {"text": "We'll be in touch soon.", "bold": True}
                    ]},
                    {"type": "p", "children": [
                        {"text": "If you need anything in the meantime, email us at "},
                        {"text": "hello@lnlgroups.com", "bold": True},
                        {"text": " or come back anytime."}
                    ]}
                ]
            }
        },
        make_choice_block(gen_id(), [
            (gen_id(), "Book a Strategy Call"),
            (gen_id(), "Back to Main Menu"),
        ])
    ]
})
# Wire thank you choices
ty_choice = data['groups'][-1]['blocks'][-1]
add_edge(ty_choice['id'], ty_choice['items'][0]['id'], 'group_booking_001')
add_edge(ty_choice['id'], ty_choice['items'][1]['id'], 'cl96ns9qr00043b6ii07bo25o')

# Wire "I'm all set" from both questionnaires to thank you
# Find the items we just created
for g in data['groups']:
    if g['id'] == 'afnl6gyrsm2ejm1gcar4qczx':
        for b in g['blocks']:
            if b['id'] == 'block_booking_cta_c':
                done_item = b['items'][2]['id']  # "I'm all set"
                add_edge('block_booking_cta_c', done_item, thankyou_group_id)
    if g['id'] == 'atzztq3dn0p7drr372k9j3jh':
        for b in g['blocks']:
            if b['id'] == 'block_booking_cta_a':
                done_item = b['items'][2]['id']
                add_edge('block_booking_cta_a', done_item, thankyou_group_id)

# ============================================================
# FIX 8: Fix "Question" group dead end - add routing after question
# ============================================================
print("FIX 8: Question group - add navigation after question input")
g = find_group('cl96og2yr001v3b6ivhzb1x34')
# Add a thank you text and navigation after the last text input
q_thankyou_id = gen_id()
q_choice_id = gen_id()
q_item_book = gen_id()
q_item_menu = gen_id()
g['blocks'].append({
    "id": q_thankyou_id,
    "type": "text",
    "content": {
        "richText": [
            {"type": "p", "children": [
                {"text": "Great question! Someone from our team will get back to you within 24 hours."}
            ]},
            {"type": "p", "children": [
                {"text": "In the meantime, would you like to:"}
            ]}
        ]
    }
})
g['blocks'].append(make_choice_block(q_choice_id, [
    (q_item_book, "Book a Strategy Call"),
    (q_item_menu, "Explore Our Services"),
]))
add_edge(q_choice_id, q_item_book, 'group_booking_001')
add_edge(q_choice_id, q_item_menu, 'cl96ns9qr00043b6ii07bo25o')

# ============================================================
# FIX 9: Fix "Has Questions - No" dead end
# ============================================================
print("FIX 9: Has Questions - No - add navigation after webhook")
g = find_group('iwzdg526ds7a31cgcoyi3iyc')
# Fix the "Lainie will reach out" text
for b in g['blocks']:
    if b['id'] == 'a8q3agfp8tpanzuvkh6onj7z':
        b['content'] = {
            "richText": [
                {"type": "p", "children": [
                    {"text": "Thanks! Our team will reach out to you shortly."}
                ]}
            ]
        }
# Add navigation after webhook
hq_choice_id = gen_id()
hq_item_book = gen_id()
hq_item_menu = gen_id()
g['blocks'].append(make_choice_block(hq_choice_id, [
    (hq_item_book, "Book a Strategy Call Now"),
    (hq_item_menu, "Keep Exploring"),
]))
add_edge(hq_choice_id, hq_item_book, 'group_booking_001')
add_edge(hq_choice_id, hq_item_menu, 'cl96ns9qr00043b6ii07bo25o')

# ============================================================
# FIX 10: Add "Book a Strategy Call" to both sub-menus
# ============================================================
print("FIX 10: Add booking option to sub-menus")

# Creatives sub-menu
g = find_group('mevgkav7jwboywm6jlwl4g3c')
for b in g['blocks']:
    if b['id'] == 'qa4df9u0xy4alibs8r6b6osr':
        book_item_id = gen_id()
        b['items'].append({"id": book_item_id, "content": "Book a Strategy Call"})
        add_edge('qa4df9u0xy4alibs8r6b6osr', book_item_id, 'group_booking_001')

# Automations sub-menu
g = find_group('bvlkqc1ba0nvr6q9twy3t0fa')
for b in g['blocks']:
    if b['id'] == 'n26v2rjz3gzobjiwb0bg0t1e':
        book_item_id = gen_id()
        b['items'].append({"id": book_item_id, "content": "Book a Strategy Call"})
        add_edge('n26v2rjz3gzobjiwb0bg0t1e', book_item_id, 'group_booking_001')

# ============================================================
# FIX 11: Add "Book a Strategy Call" option to all "Yes/Not yet" choice blocks
# ============================================================
print("FIX 11: Add booking option to Yes/Not yet choice blocks")

yes_no_blocks = [
    # Creatives content pages
    'cl96o55z3000x3b6ikq14g2tu',  # What's Brand Mining
    'rzq2hqvmknezkrwvg8f3j41w',  # How Creatives differs
    'fegl94o5i0q7zw17vj9vy9x3',  # Audit process (Creatives)
    'd35ae9lc2wpcivwgsv3gsasu',  # Digital Facelift
    # Automations content pages
    'pgw94q2e3y0w4z72alg1g7jv',  # How Automations differs
    'fwz09uzz0pyo5wuz9kmveshr',  # Pricing Automations
    'qgu0u2cjt4a2nzsue86syaln',  # Products Automations
]

for g in data['groups']:
    for b in g['blocks']:
        if b['id'] in yes_no_blocks:
            book_item_id = gen_id()
            b['items'].append({"id": book_item_id, "content": "Book a Strategy Call"})
            add_edge(b['id'], book_item_id, 'group_booking_001')

# ============================================================
# FIX 12: Fix "Book a Strategy Call" group dead end - add navigation after followup
# ============================================================
print("FIX 12: Booking group - add navigation after followup text")
g = find_group('group_booking_001')
bk_choice_id = gen_id()
bk_item_menu = gen_id()
bk_item_q = gen_id()
g['blocks'].append(make_choice_block(bk_choice_id, [
    (bk_item_menu, "Back to Main Menu"),
    (bk_item_q, "I have a question"),
]))
add_edge(bk_choice_id, bk_item_menu, 'cl96ns9qr00043b6ii07bo25o')
add_edge(bk_choice_id, bk_item_q, 'cl96og2yr001v3b6ivhzb1x34')

# ============================================================
# FIX 13: Fix "Do you have any other questions?" - add booking option
# ============================================================
print("FIX 13: 'Do you have other questions?' - add booking to yes/no")
g = find_group('xi6uo4zg7wmx22cmvxahgymq')
for b in g['blocks']:
    if b['id'] == 'izwo005mvipooszbi2tqpgaj':
        # This is a Condition block, not a choice - skip adding items
        # But let's check the actual choice before it
        pass

# ============================================================
# SAVE
# ============================================================
print("\nSaving fixed Typebot flow...")
with open('typebot-audit-flow-lnl.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)

# Also save a pretty version for review
with open('typebot-audit-flow-lnl-pretty.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Summary
print("\n=== SUMMARY ===")
print(f"Total groups: {len(data['groups'])}")
print(f"Total edges: {len(data['edges'])}")

# Verify no more dead ends at choice blocks
all_from_items = set()
for e in data['edges']:
    fr = e.get('from', {})
    if 'itemId' in fr:
        all_from_items.add(fr['itemId'])

orphans = 0
for g in data['groups']:
    for b in g['blocks']:
        if b.get('type') == 'choice input':
            for item in b.get('items', []):
                if item['id'] not in all_from_items:
                    print(f"  WARNING: Orphan choice item in {g['title']}: \"{item.get('content','')}\" ({item['id']})")
                    orphans += 1

if orphans == 0:
    print("  All choice items have outbound edges!")
else:
    print(f"  {orphans} orphan items remain")

print("\nDone! Upload typebot-audit-flow-lnl.json to Typebot.")
