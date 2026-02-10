"""
Fix Typebot JSON: variable mapping, questionnaire UX, and routing loops.

Changes:
1. Fix leading space in variable name " creatives_q1_revenue" -> "creatives_q1_revenue"
2. Fix webhook body references (leading space in key)
3. Add text bubbles before each input in both questionnaire groups
4. Fix routing: content paths -> questionnaire (not back to menu)
5. Remove stale "Click to edit" choice block in Audit Process group
"""

import json
import copy
import uuid

def short_id():
    return uuid.uuid4().hex[:24]

with open("typebot-audit-flow-lnl.json", "r", encoding="utf-8") as f:
    flow = json.load(f)

# ============================================================
# 1. Fix variable name: leading space in " creatives_q1_revenue"
# ============================================================
for var in flow["variables"]:
    if var["name"].startswith(" "):
        print(f"  FIX: Variable '{var['name']}' -> '{var['name'].strip()}'")
        var["name"] = var["name"].strip()

# ============================================================
# 2. Fix webhook body references: leading space in key
# ============================================================
def fix_webhook_body(body):
    """Remove leading/trailing spaces from webhook body template refs."""
    fixed = {}
    for k, v in body.items():
        if isinstance(v, str):
            # Fix "{{ creatives_q1_revenue}}" -> "{{creatives_q1_revenue}}"
            v = v.replace("{{ creatives_q1_revenue}}", "{{creatives_q1_revenue}}")
        fixed[k] = v
    return fixed

for group in flow["groups"]:
    for block in group["blocks"]:
        if block.get("type") == "Webhook" and "options" in block and "body" in block["options"]:
            old_body = block["options"]["body"]
            new_body = fix_webhook_body(old_body)
            if old_body != new_body:
                print(f"  FIX: Webhook body in block {block['id']}")
                block["options"]["body"] = new_body

# ============================================================
# 3. Fix Creatives Questionnaire: add text bubbles before inputs
# ============================================================
CREATIVES_GROUP_ID = "afnl6gyrsm2ejm1gcar4qczx"
AUTOMATIONS_GROUP_ID = "atzztq3dn0p7drr372k9j3jh"

# Questions for Creatives questionnaire inputs
creatives_questions = {
    "n6h83xn6ldfdf67i2jzky07h": None,  # This is the intro hook - convert to text bubble entirely
    "pd6pl1nsk3h4f3a0rzkhxjt8": "What is your name?",
    "lqwhkgr4mpmggyl1zghlvyyo": "What is your email address?",
    "or9z9z6pw063zvn1yy2ke1dz": "What is your current revenue range?",
    "eu9l9j7dbnsccf1m3harq7o7": "What\u2019s your biggest business challenge right now?",
    "xj2m9uj0sle6jzivmkolu8ku": "When are you looking to launch or revamp your brand?",
    "z95kecov1yzyqylgphlw7tfh": "How do you want to be known as an expert in your industry?",
}

# Questions for Automations questionnaire inputs
automations_questions = {
    "v966d0o0sbtujukk9x4zmf6j": "What is your name?",
    "p440gp3zax4j9ays553dqy3m": "What is your email address?",
    "qw1eppxr67ifcfwutffwdrlo": "What\u2019s your current revenue range?",
    "az7c4zd03lsor1z1ztaf41uh": "What\u2019s your biggest operational bottleneck right now?",
    "m5r1qt5twjdhm7awl80effi3": "When are you looking to implement automation?",
    "a7nodu43j0kurx5mah1p1ozm": "What\u2019s your top automation goal \u2014 lead capture, follow-up, or reporting?",
}

def make_text_bubble(text):
    return {
        "id": short_id(),
        "type": "text",
        "content": {
            "richText": [
                {"id": short_id()[:10], "type": "p", "children": [{"text": text}]}
            ]
        }
    }

def fix_questionnaire_group(group, questions_map, group_label):
    """Add text bubbles before inputs and clean up placeholders."""
    new_blocks = []
    for block in group["blocks"]:
        bid = block["id"]

        # Special case: the intro hook block in Creatives - convert from text input to text bubble
        if bid == "n6h83xn6ldfdf67i2jzky07h":
            intro_bubble = make_text_bubble(
                "Great! Let me ask you a few quick questions so I can make personalized recommendations."
            )
            intro_bubble["id"] = bid  # Keep same ID to preserve any edges
            new_blocks.append(intro_bubble)
            print(f"  FIX: Converted intro input to text bubble in {group_label}")
            continue

        if bid in questions_map and questions_map[bid] is not None:
            # Add a text bubble BEFORE the input
            bubble = make_text_bubble(questions_map[bid])
            new_blocks.append(bubble)
            print(f"  FIX: Added text bubble before input {bid} in {group_label}")

            # Clean placeholder: change to hint text, not the question
            if block["type"] == "text input":
                if bid in ("pd6pl1nsk3h4f3a0rzkhxjt8", "v966d0o0sbtujukk9x4zmf6j"):
                    block["options"]["labels"]["placeholder"] = "Type your name..."
                elif bid in ("or9z9z6pw063zvn1yy2ke1dz", "qw1eppxr67ifcfwutffwdrlo"):
                    block["options"]["labels"]["placeholder"] = "e.g. $100K-$500K"
                elif bid in ("eu9l9j7dbnsccf1m3harq7o7", "az7c4zd03lsor1z1ztaf41uh"):
                    block["options"]["labels"]["placeholder"] = "Type your answer..."
                elif bid in ("xj2m9uj0sle6jzivmkolu8ku", "m5r1qt5twjdhm7awl80effi3"):
                    block["options"]["labels"]["placeholder"] = "e.g. Next 30 days"
                elif bid in ("z95kecov1yzyqylgphlw7tfh", "a7nodu43j0kurx5mah1p1ozm"):
                    block["options"]["labels"]["placeholder"] = "Type your answer..."
                else:
                    block["options"]["labels"]["placeholder"] = "Type here..."
            elif block["type"] == "email input":
                block["options"]["labels"]["placeholder"] = "your@email.com"

        new_blocks.append(block)

    group["blocks"] = new_blocks

for group in flow["groups"]:
    if group["id"] == CREATIVES_GROUP_ID:
        fix_questionnaire_group(group, creatives_questions, "LNL Creatives Questionnaire")
    elif group["id"] == AUTOMATIONS_GROUP_ID:
        fix_questionnaire_group(group, automations_questions, "LNL Automations Questionnaire")

# ============================================================
# 4. Fix routing: content paths should route to questionnaire
#    instead of back to the FAQ menu
# ============================================================

# CREATIVES SIDE: groups that currently Jump back to Menu for LNL Creatives
# Each has a "Before we wrap up..." prompt + "Cool!" + Jump -> menu
# We change choice to 2 options: "Yes, let's do it!" -> questionnaire, "Not yet" -> menu
# And update the Jump accordingly.

CREATIVES_MENU_ID = "mevgkav7jwboywm6jlwl4g3c"
AUTOMATIONS_MENU_ID = "bvlkqc1ba0nvr6q9twy3t0fa"

def fix_routing_for_group(group, questionnaire_group_id, menu_group_id, side_label):
    """
    Find the choice block + Jump at the end. Convert to:
    - Choice item 1: "Yes, let's do it!" -> questionnaire
    - Choice item 2: "Not yet, tell me more" -> menu
    """
    blocks = group["blocks"]

    # Find the last choice input and the Jump after it
    choice_idx = None
    jump_idx = None
    for i, block in enumerate(blocks):
        if block["type"] == "choice input" and i >= len(blocks) - 3:
            choice_idx = i
        if block["type"] == "Jump" and i >= len(blocks) - 3:
            jump_idx = i

    if choice_idx is None or jump_idx is None:
        print(f"  SKIP: Could not find choice+jump pattern in {group['title']}")
        return

    choice_block = blocks[choice_idx]
    jump_block = blocks[jump_idx]

    # Check if Jump currently goes to menu (not already fixed)
    if jump_block.get("options", {}).get("groupId") not in (menu_group_id,):
        print(f"  SKIP: {group['title']} Jump doesn't go to menu, already fixed or different routing")
        return

    # Create new item IDs and edge IDs
    yes_item_id = f"item_yes_{short_id()[:8]}"
    no_item_id = f"item_no_{short_id()[:8]}"
    yes_edge_id = f"edge_yes_{short_id()[:8]}"
    no_edge_id = f"edge_no_{short_id()[:8]}"

    # Replace choice items
    choice_block["items"] = [
        {
            "id": yes_item_id,
            "outgoingEdgeId": yes_edge_id,
            "content": "Yes, let's do it!"
        },
        {
            "id": no_item_id,
            "outgoingEdgeId": no_edge_id,
            "content": "Not yet, tell me more"
        }
    ]

    # Remove the Jump block (no longer needed - edges handle routing)
    blocks.pop(jump_idx)

    # Remove any stale "Click to edit" choice blocks that might exist
    blocks_to_remove = []
    for i, block in enumerate(blocks):
        if (block["type"] == "choice input"
            and len(block.get("items", [])) == 1
            and block["items"][0].get("content") == "Click to edit"
            and block["id"] != choice_block["id"]):
            blocks_to_remove.append(i)
    for i in reversed(blocks_to_remove):
        removed = blocks.pop(i)
        print(f"  FIX: Removed stale 'Click to edit' block {removed['id']} from {group['title']}")

    # Add edges
    flow["edges"].append({
        "id": yes_edge_id,
        "from": {"blockId": choice_block["id"], "itemId": yes_item_id},
        "to": {"groupId": questionnaire_group_id}
    })
    flow["edges"].append({
        "id": no_edge_id,
        "from": {"blockId": choice_block["id"], "itemId": no_item_id},
        "to": {"groupId": menu_group_id}
    })

    # Remove old edges from this choice block
    old_item_ids = set()
    # The old items had outgoingEdgeIds that we need to clean up
    # They're already replaced, but we should remove stale edges
    flow["edges"] = [
        e for e in flow["edges"]
        if not (e.get("from", {}).get("blockId") == choice_block["id"]
                and e["id"] not in (yes_edge_id, no_edge_id))
    ]
    # Also remove edges from the old Jump block
    flow["edges"] = [
        e for e in flow["edges"]
        if not (e.get("from", {}).get("blockId") == jump_block["id"])
    ]

    print(f"  FIX: Routing in '{group['title']}' -> questionnaire or menu ({side_label})")

# Groups to fix on the Creatives side
creatives_content_groups = [
    "cl96o2cgi000r3b6iljr1iwdl",  # What's Brand Mining
    "vqthohxh3tqe2aqvk5t6en2r",  # How does LNL Creatives differ
    "qrpnvsf60axuc7owmyxokz1n",  # Tell me about the audit process
    "ttpzef1kb2hdogvvd4jvig40",  # Tell me about the "Digital Facelift"
]

# Groups to fix on the Automations side
automations_content_groups = [
    "tcryl0fx548x88mhgk7iddga",  # How does LNL Automations differ
    "p9c7ly87uvgfjh028ogifhpk",  # Tell me about pricing for LNL Automations
    "spn48i6s2rvnxmlgu3k1zg9b",  # What products does LNL Automations offer
]

for group in flow["groups"]:
    if group["id"] in creatives_content_groups:
        fix_routing_for_group(group, CREATIVES_GROUP_ID, CREATIVES_MENU_ID, "Creatives")
    elif group["id"] in automations_content_groups:
        fix_routing_for_group(group, AUTOMATIONS_GROUP_ID, AUTOMATIONS_MENU_ID, "Automations")

# ============================================================
# 5. Fix "Has Questions - No" webhook: also has leading space
# ============================================================
# Already handled by the generic webhook fix in step 2.

# ============================================================
# 6. Also fix the Automations content paths that share the
#    audit group (Creatives audit path is shared via edge)
# ============================================================
# The Automations "Tell me about the audit process" edge goes to
# the same audit group as Creatives. That group already routes to
# Creatives questionnaire. The Automations audit should have its
# own version or at least the shared one should be handled.
# For now, the audit group from the Automations menu also links
# to the same audit group - this was already there in the original.
# We'll leave that as-is since it's a content path, not a questionnaire path.

# ============================================================
# Write output
# ============================================================
with open("typebot-audit-flow-lnl.json", "w", encoding="utf-8") as f:
    json.dump(flow, f, ensure_ascii=False)

print("\nDone! Typebot JSON updated.")
