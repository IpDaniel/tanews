import logging
logger = logging.getLogger(__name__)

import streamlit as st
from modules.nav import SideBarLinks
import requests

st.set_page_config(layout = 'wide')

SideBarLinks()

st.title(f"Welcome to the Advisor Home Page, {st.session_state['first_name']}!")
st.write('')
st.write('')
st.write('### How can I assist you in helping others today?')

if st.button('View Users',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/25_Users.py')

if st.button('View Question Bank',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/21_Question_Bank.py')

if st.button('View Interview Prep Bank',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/26_Interview_Prep.py')

if st.button('View Peer Stories',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/22_Peer_Stories.py')

if st.button('View Companies',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/23_Companies.py')

if st.button('View Analytics',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/24_Analytics.py')