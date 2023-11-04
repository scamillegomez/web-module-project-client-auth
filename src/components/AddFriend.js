import React  from "react";



export default function AddFriend (props) {
    
    const {values, handleChange, handleSubmit} = props;

    const onSubmit = e => {
        e.preventDefault();
        handleSubmit();
    }

    const onChange = e => {
        const { name, value } = e.target;
        handleChange(name,value);
    }

    return(
        <form onSubmit={onSubmit}>
            <h2>ADD FRIEND</h2>

            <label>NAME
                <input 
                    type="text"
                    value={values.name}
                    name='name'
                    onChange={onChange}
                />
            </label>
            <label>EMAIL
                <input 
                    type="text"
                    name='email'
                    value={values.email}
                    onChange={onChange}
                />
            </label>
            <button>SUBMIT</button>
        </form>
    )
}