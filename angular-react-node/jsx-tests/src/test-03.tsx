/**
 * In the following React template, create a simple form at the top that allows the user to enter in a first name, last name, and phone number and there should be a submit button. 
 * Once the submit button is pressed, the information should be displayed in a list below (automatically sorted by last name) along with all the previous information that was entered.
 * This way the application can function as a simple phone book. 
 * When your application loads, the input fields (not the phone book list) should be prepopulated with the following values already:
 * 
    First name = Coder
    Last name = Byte
    Phone = 8885559999
 * 
 */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const style = {
    table: {
        borderCollapse: "collapse"
    },
    tableCell: {
        border: '1px solid gray',
        margin: 0,
        padding: '5px 10px',
        width: 'max-content',
        minWidth: '150px'
    },
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
            marginBottom: '40px'
        },
        inputs: {
            marginBottom: '5px'
        },
        submitBtn: {
            marginTop: '10px',
            padding: '10px 15px',
            border: 'none',
            backgroundColor: 'lightseagreen',
            fontSize: '14px',
            borderRadius: '5px'
        }
    }
} as const;

function PhoneBookForm({ addEntryToPhoneBook, updateUsers }) {
    const [firstname, setFirstname] = useState('Coder');
    const [lastname, setLastname] = useState('Byte');
    const [phone, setPhone] = useState(8885559999);
    
    function onChangeFirstname(e) {
        setFirstname(e.target.value)
    }
    function onChangeLastname(e) {
        setLastname(e.target.value)
    }
    function onChangePhone(e) {
        setPhone(e.target.value)
    }
    
    function onSubmit(e) {
        e.preventDefault()
        if(firstname !== '' && lastname !== '' && phone !== ''){
            let users = localStorage.getItem('wallethub_users')
            users = JSON.parse(users)
            if(users && Array.isArray(users)){
                users.push({
                    'firstname': firstname,
                    'lastname': lastname,
                    'phone': phone
                })
            } else {
                users = [{
                    'firstname': firstname,
                    'lastname': lastname,
                    'phone': phone
                }]
            }

            localStorage.setItem('wallethub_users', JSON.stringify(users));

            
            setFirstname('')
            setLastname('')
            setPhone('')
            
            updateUsers()
        } else {
            alert('firstname, lastname & phone required!')
        }

    }
    return (
        <form onSubmit={onSubmit} style={style.form.container}>
            <label>First name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userFirstname'
                name='userFirstname'
                type='text'
                value={firstname} 
                onChange={onChangeFirstname}
            />

            <br />
            <label>Last name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userLastname'
                name='userLastname'
                type='text'
                value={lastname} 
                onChange={onChangeLastname}
            />
            <br />
            <label>Phone:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userPhone'
                name='userPhone'
                type='text'
                value={phone} 
                onChange={onChangePhone}
            />
            <br />
            <input
                style={style.form.submitBtn}
                className='submitButton'
                type='submit'
                value='Add User'
            />
        </form>
    )
}

function InformationTable({users}) {

    return (
        <table style={style.table} className='informationTable'>
            <thead>
                <tr>
                    <th style={style.tableCell}>First name</th>
                    <th style={style.tableCell}>Last name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {
                  users.map(user => 
                    <tr key={user.firstname}>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.phone}</td>
                    </tr> 
                  )
                }
            </tbody>
        </table>
    );
}

function Application(props) {
    useEffect(() => {
        getUsers()
    }, []);

    const [users, setUsers] = useState([])
    function getUsers(){
        let tempdata = localStorage.getItem('wallethub_users')
        tempdata = JSON.parse(tempdata)
        if(tempdata && Array.isArray(tempdata)){
            tempdata = tempdata.sort((a, b) => {
              const nameA = a.lastname.toUpperCase(); // ignore upper and lowercase
              const nameB = b.lastname.toUpperCase(); // ignore upper and lowercase
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              // names must be equal
              return 0;
            });
            setUsers(tempdata)
        } else {
            setUsers([])
        }
    }

    return (
        <section>
            <PhoneBookForm addEntryToPhoneBook="" updateUsers={getUsers} />
            <InformationTable users={users} />
        </section>
    );
}

ReactDOM.render(
    <Application />,
    document.getElementById('test-03')
);