import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.write("# Explore the most relevant analytics")

analytics = requests.get('http://api:4000/a/analytics').json()

try:
  st.dataframe(analytics) 
except:
  st.write("Could not connect connect to api.")