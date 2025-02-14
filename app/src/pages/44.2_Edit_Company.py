import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

userID = st.session_state['id']

st.write("# Update a Company")

company_id = st.text_input("Enter the Company ID you want to update:")

if company_id:
    get_url = f"http://api:4000/co/companies/{company_id}"
    response = requests.get(get_url)
    
    if response.status_code == 200:
        company_data = response.json()
        
        existing_companyName = company_data.get('companyName', '')
        existing_location = company_data.get('location', '')

        with st.form("Update Company Form"):
            new_companyName = st.text_input("Company Name:", value=existing_companyName)
            new_location = st.text_input("Location:", value=existing_location)

            submitted = st.form_submit_button("Update Company")

            if submitted:
                update_data = {}
                if new_companyName != existing_companyName:
                    update_data["companyName"] = new_companyName
                if new_location != existing_location:
                    update_data["location"] = new_location

                if not update_data:
                    st.warning("No changes detected.")
                else:
                    put_url = f"http://api:4000/co/companies/{company_id}"
                    put_response = requests.put(put_url, json=update_data)

                    if put_response.status_code == 200:
                        st.success("Company updated successfully!")
                    else:
                        st.error(f"Failed to update company: {put_response.text}")
    else:
        st.error("Company not found or unable to fetch company details.")
