import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.write("# Register for NUReady")

st.write("## Register as a new user")

with st.form("Register User"):
    userName = st.text_input("User Name")
    
    email = st.text_input("Email")
    
    userType = st.selectbox(
        "User Type",
        options=["Student", "Alumni", "Advisor", "TA"],
        help="Select the type of user."
    )
    
    submitted = st.form_submit_button("Sign up")
    
    if submitted:
        try:
            data = {
                "userName": userName,
                "email": email,
                "userType": userType
            }
            st.write("User submitted successfully")
            
            response = requests.post('http://api:4000/u/users', json=data)
            
            if response.status_code == 201:
                response_data = response.json()
                new_user_id = response_data.get("userID")
                st.success(f"User created successfully! New User ID: {new_user_id}")
            else:
                st.error(f"Failed to create user: {response.text}")
        except ValueError:
            st.error("Please enter valid data.")
        except Exception as e:
            st.error(f"An error occurred: {e}")

