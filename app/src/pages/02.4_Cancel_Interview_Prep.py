import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.write("# Cancel Interview Prep Session")
st.write ("")
st.write("Type in the interview prep session ID to cancel that session")\

with st.form("InterviewPrepID"):
  prep_id = st.text_input("InterviewPrep ID")
  submitted = st.form_submit_button("Cancel This Interview Prep")
  if submitted:
    url = f'http://api:4000/i/interviewprep/{prep_id}'
    
    try:
      response = requests.delete(url)
      response.raise_for_status()
      st.write("Interview prep session cancelled successfully")
    except:
      st.write("Could not connect connect to api.")

# I already deleted 39 and 40 to test lol
# THIS IS THE ONLY DELETE ONE I HAVE WORKING BECAUSE I DONT WANNA TOUCH THE DB
# SCARED OF BREAKING IT LOL