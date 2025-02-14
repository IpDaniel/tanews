import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.write("# Delete Peer Story")
st.write ("")
st.write("Type in the peer story ID to delete that story")\

with st.form("PeerStoryID"):
  story_id = st.text_input("PeerStory ID")
  submitted = st.form_submit_button("Delete This Peer Story")
  if submitted:
    url = f'http://api:4000/p/peerstories/{story_id}'
    
    try:
      response = requests.delete(url)
      response.raise_for_status()
      st.write("Story deleted successfully")
    except:
      st.write("Could not connect connect to api.")

# TODO: Erroring because of ON DELETE relationships needs to be fixed in db