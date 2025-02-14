import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

userID = st.session_state['id']

st.write("# Update a User")

user_id = st.text_input("Enter the User ID you want to update:")

if user_id:
    get_url = f"http://api:4000/u/users/{user_id}"
    response = requests.get(get_url)
    
    if response.status_code == 200:
        user_data = response.json()
        
        existing_userName = user_data.get('userName', '')
        existing_email = user_data.get('email', '')
        existing_userType = user_data.get('userType', '')

        with st.form("Update User Form"):
            new_userName = st.text_input("User Name:", value=existing_userName)
            new_email = st.text_input("Email:", value=existing_email)
            new_userType = st.text_input("User Type:", value=existing_userType)

            submitted = st.form_submit_button("Update User")

            if submitted:
                update_data = {}
                if new_userName != existing_userName:
                    update_data["userName"] = new_userName
                if new_email != existing_email:
                    update_data["email"] = new_email
                if new_userType != existing_userType:
                    update_data["userType"] = new_userType

                if not update_data:
                    st.warning("No changes detected.")
                else:
                    put_url = f"http://api:4000/u/users/{user_id}"
                    put_response = requests.put(put_url, json=update_data)

                    if put_response.status_code == 200:
                        st.success("User updated successfully!")
                    else:
                        st.error(f"Failed to update user: {put_response.text}")
    else:
        st.error("User not found or unable to fetch user details.")
