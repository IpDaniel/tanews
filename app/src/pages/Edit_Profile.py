import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.write("# Update a User")

st.write("## Update the details of an existing user")

user_id = st.session_state['id']

with st.form("UpdateUserForm"):
    userName = st.text_input("Edit your Name")
    email = st.text_input("Edit your Email")
    userType = st.selectbox(
        "User Type",
        options=["Student", "Alumni", "Advisor", "TA"],
        help="Select the type of user."
    )

    submitted = st.form_submit_button("Submit")

    if submitted:
        try:
            data = {}
            if userName:
                data['userName'] = userName
            if email:
                data['email'] = email
            if userType:
                data['userType'] = userType

            st.write("User update submitted successfully")

            response = requests.put(f'http://api:4000/u/users/{user_id}', json=data)

            if response.status_code == 200:
                st.success("User updated successfully!")
            else:
                st.error(f"Failed to update user: {response.text}")
        except ValueError:
            st.error("Please enter valid data.")
        except Exception as e:
            st.error(f"An error occurred: {e}")

# Please ensure that the user ID exists and fields are valid.
