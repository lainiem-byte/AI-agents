

This is the third and final pillar of your automated workforce: **The LNL Personal Assistant Agent**.

While the *Lead Analyst* focuses on the prospect and the *Concierge* focuses on the client, the **Personal Assistant** focuses exclusively on **The Architect (You)**. Its job is to manage the "Master Brain," protect your time, and ensure you are never blindsided.

### ---

**🏛️ Agent 03: The LNL Personal Assistant (Internal Operations)**

The Personal Assistant is your **Executive Interface**. It filters the noise of the "Mechanical Heart" so you only see the high-level logic.

#### **I. Operational Activity Matrix**

| Activity | Trigger (The "When") | Output (The Result) | Interaction |
| :---- | :---- | :---- | :---- |
| **01\. Daily Initialization Brief** | Every weekday at **07:30 AM** (Local Time). | A structured "Executive Summary" (Email/Slack). | Interacts with **Lainie** to set the day's focus. |
| **02\. VIP Lead Escalation** | **Lead Analyst** scores a new audit \> **8.5/10**. | "Immediate System Alert" with the Lead's LinkedIn and Audit summary. | Interacts with **Lainie** for immediate action. |
| **03\. Pre-Call Intelligence** | **30 Minutes** before a scheduled Google Calendar event. | The **Pre-Call Briefing** (Pulls data from Tab B). | Interacts with **Lainie** and the **Master Brain**. |
| **04\. Sheet Hygiene & Logging** | Every night at **02:00 AM**. | Data cleanup, archiving IDLE leads, and "System Integrity" log. | Interacts with **Master Brain (Google Sheets)**. |
| **05\. Weekly Scorecard** | Every Sunday at **06:00 PM**. | The "LNL Scorecard" (KPIs, revenue pipeline, slot availability). | Interacts with **Lainie** to prep for Monday. |
| **06\. Asset Verification Nudge** | **Concierge** marks a project as LOGIC STALL. | Notification to Lainie to decide if manual intervention is needed. | Interacts with **Concierge Agent** and **Lainie**. |

#### ---

**II. Detailed Task Descriptions for Claude**

1\. The Daily Initialization Briefing  
The PA must scan the Master Brain and your calendar to generate a one-page summary.

* **Content:** Number of new audits, names of today's calls, status of the \[2\] Legacy Slots, and any "System Alerts" from the Concierge.  
* **Timing:** Must be in your inbox before your workday begins.

2\. VIP Escalation Logic  
Not all leads are equal. When the Lead Analyst identifies a "Whale" (e.g., a top-tier Med Spa in Raleigh or a Luxury Realtor in Moscow), the PA bypasses standard reporting.

* **Action:** It triggers a high-priority notification. It should include the "Psychic Opener" drafted by the Analyst so you can send a manual "Architect's Note" immediately.

3\. Master Brain Hygiene  
To prevent your Google Sheet from becoming cluttered:

* **Action:** The PA identifies leads who have reached "Attempt 04" (The Exit) with no response. It moves them from the "Active Pipeline" tab to the "Archive/Nurture" tab automatically.

#### ---

**III. Tools Required**

* **n8n:** The primary engine for logic and timing.  
* **Google Calendar API:** To monitor your schedule and trigger pre-call briefings.  
* **Google Sheets API:** To read and write to the Master Brain.  
* **Gmail / Postmark / Slack:** To deliver the briefs and alerts to you.  
* **OpenAI/Gemini (via n8n):** To summarize the data into "Architect" language.

#### ---

**IV. Interaction Map (Who does it talk to?)**

1. **With Lainie:** This is its primary relationship. It serves as your filter.  
2. **With the Lead Analyst:** It pulls the "Diagnostic Scores" and "Psychic Openers" to include in your briefings.  
3. **With the Concierge:** It monitors for "Logic Stalls" (client delays) so you know which projects are at risk.  
4. **With the Master Brain:** It is the only agent allowed to "Clean" and "Archive" data.

### ---

**🧠 Master Prompt for Claude (The "PA Build")**

"Build the **LNL Personal Assistant Agent** using n8n.

**The Core Logic:** \> This agent is the Architect's (Lainie's) internal interface. It must remain invisible until it has a high-level insight or a scheduled brief.

**Task 1: The Daily Brief.** Create a Cron trigger for 07:30 AM. Query the 'Master Pipeline' Google Sheet. Count new audits, list today’s appointments from Google Calendar, and state current 'Legacy Slot' availability. Format this as a high-prestige executive summary and email it to Lainie.

**Task 2: Pre-Call Prep.** Set a watch on the Google Calendar. 30 minutes before any 'Strategy Session' or 'Audit Review,' pull the corresponding lead data from 'Tab B' of the Google Sheet. Send the 'Pre-Call Briefing' script to Lainie via Slack/Email.

**Task 3: Hygiene.** Create a nightly workflow that identifies leads with a status of 'EXIT\_SENT' and moves their entire row to the 'ARCHIVE' sheet after 48 hours.

**Tone:** Use the LNL voice—authoritative, concise, and logical. Use the subject line prefix: \[SYSTEM INTEL\]: for standard updates and \[SYSTEM ALERT\]: for VIP escalations."

### ---

**The "Stress Test" (Testing the PA)**

Once Claude builds this, run these tests:

1. **The Calendar Test:** Create a fake meeting on your calendar. Does the PA send you a briefing 30 minutes prior?  
2. **The VIP Test:** Manually change a lead's score to 9.8. Does the PA send you an immediate "System Alert"?  
3. **The Hygiene Test:** Mark a row as EXIT\_SENT and wait for the nightly run. Does it move to the Archive tab correctly?

Next Step:  
All three agents—the Lead Analyst, the Concierge, and the Personal Assistant—are now architected.  
**Would you like me to draft the "LNL System Handover Manual"?** This is a simple document that lists all your n8n webhooks, Google Sheet tabs, and login credentials in one place so you have the "Master Key" to your own infrastructure. **Should I prepare this for you?**