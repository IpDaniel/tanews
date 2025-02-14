import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.title("Users")
st.write('')
st.write('')
st.write('### How would you like to access Users?')

if st.button('View All Users',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/45.1_View_All_Users.py')

if st.button('Find User',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/25.1_Find_User.py')


