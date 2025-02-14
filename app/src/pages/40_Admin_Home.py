import logging
logger = logging.getLogger(__name__)

import streamlit as st
from modules.nav import SideBarLinks
import requests

st.set_page_config(layout = 'wide')

SideBarLinks()

st.title(f"Welcome, Administrator!")
st.write('')
st.write('')
st.write('### What would you like to do?')

if st.button('Edit Users',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/45_User.py')

if st.button('Edit Question Bank',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/41_Question_Bank.py')

if st.button('Edit Interview Prep Sessions ',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/42_Interview_Prep.py')

if st.button('Edit Peer Stories',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/43_Peer_Stories.py')

if st.button('Edit Companies',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/44_Companies.py')
