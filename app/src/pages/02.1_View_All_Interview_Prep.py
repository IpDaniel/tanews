import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.write("# View all Interview Preps")

questions = requests.get('http://api:4000/i/interviewprep').json()

try:
  st.dataframe(questions) 
except:
  st.write("Could not connect connect to api.")
