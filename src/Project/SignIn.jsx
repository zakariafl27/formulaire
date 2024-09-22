import { useRef, useState } from 'react'


export default function SignIn() {


    const name = useRef()
    const email = useRef()
    const phone = useRef()
    const password = useRef()
    const age = useRef()
    const AcceptAllConditions = useRef()

    const [errors, setErrors] = useState({})
    const [isFormValid, setIsFormValid] = useState(false)
    const [isFormSent, setIsFormSent] = useState(false)


    const ValidateRequired = (ref) => {
        if (ref.current.value.trim() === '') {
            setErrors(prevState => {
                return { 
                    ...prevState, 
                    ...{ [ref.current.id]: 'field required' 
                    } 
                }
            })
            setIsFormValid(false)
        }
    }

    const ValidateForm = () => {

        const acceptAllConditionsValue = AcceptAllConditions.current.checked
        const ageValue = age.current.value
        const passwordValue = password.current.value
        let isFormValid = true

        setErrors([])

        ValidateRequired(name)
        ValidateRequired(email)
        ValidateRequired(phone)

        

        if (!acceptAllConditionsValue) {
            setErrors(prevState => {
                return { 
                    ...prevState, 
                    ...{ [AcceptAllConditions.current.id]: 'must be checked' } }
            })
            isFormValid = false
        }

        const minAge = 18
        const maxAge = 35


        if (ageValue < minAge || ageValue > maxAge) {
            setErrors(prevState => {
                return { 
                    ...prevState, 
                    ...{ [age.current.id]: 'Age must be between 18 and 35' } }
            })
            isFormValid = false
        }


        const symboles = /[!@#$%*(),.?":{}|<>^]/

        if (password.length < 8) { 
            setErrors(prevState => {
                return { 
                    ...prevState, 
                    ...{[password.current.id]: 'Password must be at least 8 characters long'}
                };
            });
            isFormValid = false;

        } else if (!passwordValue.match(symboles)) {  
            setErrors(prevState => {
                return {
                    ...prevState, 
                    ...{[password.current.id]: 'Password must contain at least one symbol'}
                };
            });
            isFormValid = false;
        }

        setIsFormValid(isFormValid)
        return isFormValid

    }

    const resetForm = ()=>{
        name.current.value = ''
        email.current.value = ''
        age.current.value = ''
        password.current.value = ''
        phone.current.value = ''
        AcceptAllConditions.current.checked = false
    }

    const getError = (fieldName)=>{
        return errors[fieldName]
    }

    const hasError = (fieldName)=>{
        return getError(fieldName) !== undefined
    }

    const displayError = (ref) => {
        if (ref.current !== undefined) {
            const fieldName = ref.current.id
            if (hasError(fieldName)) {
                ref.current.style.border = '1px solid red'
                ref.current.style.backgroundColor = 'rgba(255,0,0,0.1)'
                return <div className={'text-danger'}>{getError(fieldName)}</div>
            }
            ref.current.style.border = '1.5px solid green'
            ref.current.style.backgroundColor = 'rgba(0,255,0,0.1)'
        }
    }

    const displayErrors = ()=>{
        return Object.entries(errors).map((error,index)=>{
            const [field, message] = error
            return <li key={index}>{field}: {message}</li>
        })
    }

    const handleChange = ()=>{
        ValidateForm()
    }

    const SubmitForm = (e) => {
        e.preventDefault()
        setIsFormSent(false)
        if(ValidateForm()){
            setIsFormSent(true)
            resetForm()
        }

    }

    
    return(

        <div className={'container-fluid w-75 mx-auto my-5'}>
            {
                isFormSent ?
                <div>
                    <div className={'alert alert-success'}>Form sent successfully</div>
                    <a href='/' className='btn btn-danger'>7ayade 3liya</a>
                </div>
                : <form onSubmit={SubmitForm} onChange={handleChange}>
                    {
                        Object.keys(errors).length > 0 ?
                            <div className={'alert alert-danger'}>
                                <h1>Please fill in the form correctly</h1>
                                    <strong>Errors</strong>
                                        <ul>
                                            {displayErrors()}
                                        </ul>
                            </div>
                        :'' 
                    }
            
            
                <h1>Sign Up</h1>
                <hr />

                {/* Name Input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" ref={name} />
                    {displayError(name)}
                </div>

                {/* Email Input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email:</label>
                    <input type="text" id="email" className="form-control" ref={email} />
                    {displayError(email)}
                </div>

                {/* Password Input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" ref={password} />
                    {displayError(password)}
                </div>

                {/* Phone Input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="phone">Phone:</label>
                    <input type="text" className="form-control" id="phone" ref={phone} />
                    {displayError(phone)}
                </div>

                {/* Age Input */}
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="age">Age:</label>
                    <input type="number" className="form-control" id="age" ref={age} />
                    {displayError(age)}
                </div>

                {/* Accept les Conditions */}
                <div className="form-check mb-4">
                    <div className="d-flex">
                        <input className="form-check-input me-2" type="checkbox" id="acceptAllConditions" ref={AcceptAllConditions} />

                        <label className="form-check-label" htmlFor="acceptAllConditions">
                            Accept all conditions
                        </label>
                    </div>
                    {displayError(AcceptAllConditions)}
                </div>

                {/* Button Confirmation */}
                <button disabled={!isFormValid} type="submit" className="btn btn-dark w-100 p-2">CONFIRMER</button>
            </form>
}

    </div>
)
}
