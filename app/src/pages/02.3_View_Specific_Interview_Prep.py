import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.write("# Find Interview Prep Session")
st.write ("")
st.write("Enter the prep session ID to view details")\

with st.form("InterviewPrepID"):
  question_id = st.text_input("InterviewPrep ID")
  submitted = st.form_submit_button("Submit")
  if submitted:
    url = f'http://api:4000/i/interviewprep/{question_id}'
    question = requests.get(url).json()
    try:
      st.write(question)
    except:
      st.write("Could not connect connect to api.")
