# funnelLeasing
# Introduction
# This repo is a very simply structured Node.js Express API built by me Thomas McCarthy as a takehome application project
# 
#
#
# Setup and Running
# Congrats! If you're here then youve already completed step 1 - Download the Repo
# Steps to Run
# 1. Navigate to the top of the repo funnelLeasing in your terminal
# 2. Run 'npm i' to install all necessary packages for the project
# 3. In the repository run 'node index'
# 4. Navigate to http://localhost:3000/
# Congrats! The project is now running!
#
# Navigation
# Once you have navigated to http://localhost:3000/ there are two clickable links.
# 'Live Data' and 'DANGER???'

# 'Live Data'
# This will call on the /stats endpoint and return the minimum, maximum, and average altitude over the past 5 minutes

# 'DANGER???'
# This will call on the /health endpoint which returns the orbitalEmergencyStatus that is one of three messages based on the following logic:
#   - Whenever the average altitude of the satellite over the last minute goes below 160km, return the message “WARNING: RAPID ORBITAL DECAY IMMINENT”
#   - Once the average altitude over the last minute of the satellite returns to 160km or above, return the message “Sustained Low Earth Orbit Resumed” for 1 minute.
#   - Otherwise return the message “Altitude is A-OK”

# To return to the main page hit the back button on your browser to return to the homepage to visit one of the two links again and call the endpoint