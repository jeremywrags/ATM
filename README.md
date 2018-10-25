The ATM Demo app is an example of how Interaction Studio could present a Next Best Action to another channel, in this example an ATM but this could be a Gas Pump, POS system, Digital Menu like at Sonic or Chili's... We can also send activity to interaction studio from this app.

Demo Flow:

1. Enter a pin number (can be anything)
2. Press Enter
3. Click the Balance Inquiry button

Once you click balance inquiry it sends a request to Interaction Studio on the atm://atm/ touchpoint. This registers an event in IS and also returns an offer to the customer.

Setup:

1. Create a Proposition: ATM
2. Create and Activity Type: Balance Inquiry
3. Create a touchpoint:
    a. Channel: Anything but I choose Physical
    b. Name: ATM (or whatever you want to call it)
    c. Base URI: atm://atm
4. Create an Asset in Interaction Studio. This could be an Image or any other HTML that you want to display. You may need to tweak this to make it fit inside the ATM.
5. Create an Action
    a. Name: Anything you like
    b. Type: Dynamic Content
    c. Proposition: Blank
    d. Eligibility: Blank
6. Create an Interaction Point on the ATM touchpoint
    a. Name: ATM Offer
    b. Interaction Point Path: /offer
    c. Create an Activity Capture Point 
        1. Name: ATM0-Action
        2. Track Activity: Set Proposition Manually
        3. Proposition: ATM
        4. Activity Type: Balance Inquiry
        5. On: Interaction Load
        6. Completion: No
    d. Create an Online Optimization Points
        1. Name: ATM Offer
        2. Element Path: Anyting
        3. Number of Actions Returned: 1
        4. Specify Content Position: Replace
        5. Action Selection: Fixed
        6. Equal Distribution: Checked
        7. Select Action: Whatever you named your Action
        8. Viewpoint: Don't use one.

Deploy this app to your heroku Instance. 


[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/jeremywrags/ATM.git)
