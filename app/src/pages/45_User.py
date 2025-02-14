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
st.write('### What would you like to do, Administrator')

if st.button('View All Users',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/45.1_View_All_Users.py')

if st.button('Edit User Details',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/45.2_Edit_User.py') #TODO: Implement this page

if st.button('Delete User',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/45.3_Delete_User.py')