import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.write("# Finding A Story")
st.write ("")
st.write("Enter the Story ID to view the details")\

with st.form("PeerStoryID"):
  stories_id = st.text_input("PeerStory ID")
  submitted = st.form_submit_button("Find Story")
  if submitted:
    url = f'http://api:4000/p/peerstories/{stories_id}'
    question = requests.get(url).json()
    try:
      st.write(question)
    except:
      st.write("Could not connect connect to api.")
