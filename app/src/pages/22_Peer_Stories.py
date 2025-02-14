import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

# Alumni and Students overlap in the stories they tell, so we can reuse student links
st.title("Peer Stories: Experiences of job searching")
st.write('')
st.write('')
st.write('### How can I assist you with Peer Stories?')

if st.button('View Stories',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/03.1_View_All_Peer_Stories.py')

if st.button('Find Stories',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/03.4_View_A_Peer_Stories.py')

if st.button('Tell a Story',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/03.2_Tell_Story.py')

if st.button('Edit a Story',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/03.3_Edit_A_Story.py')
