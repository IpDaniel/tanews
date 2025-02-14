import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.write("# Your Interview Prep Schedule") 
st.write("")

id = st.session_state['id']
url = f'http://api:4000/i/interviewprep/student/{id}'
questions = requests.get(url).json()

try:
  st.dataframe(questions) 
except:
  st.write("Could not connect connect to api.")
