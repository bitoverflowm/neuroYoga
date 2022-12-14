import React, {useState} from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { FaInstagram } from 'react-icons/fa';

const validationSchema = Yup.object().shape({
    name: Yup.string(),
    phone: Yup.string().required('We need a phone number to send the invite witth 10 free deliveries'),
    zipcode: Yup.string().required('We pretty much just launch where usesers want us'),
    address: Yup.string()
});

const Chat = props => {
    const [loading, setLoading ] = useState(false);
    const [submitted, setSubmitted ] = useState(false);
    const [visible, setVisible ] = useState(false);

    const submitHandler = async values => {
        setLoading(true);
        try{
            const res = await fetch('/api/waitlist', {
                body: JSON.stringify({
                    name: values.name,
                    phone: values.phone,
                    zipcode: values.zipcode,
                    address: values.address
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            })
            const result = await res.json();
            setLoading(false);
            setSubmitted(true);
            return result
        } 
        catch (error) {
            console.log(error);
        }
    }

    const item =() => {
        if( loading ){
            return (
                <div className="animate-pulse">
                    Submitting...
                </div>
            )
        } else if (submitted){
            return (
                <div>
                    Thank you! ❤️
                    We will be in touch shortly.
                </div>
            )
        } else {
            return (
                <Formik 
                initialValues={{
                    name: '',
                    email: '',
                    note: ''
                }}
                validationSchema={ validationSchema }
                onSubmit={values => submitHandler(values)}
                render={({ errors, touched }) => (
                    <Form className='mt-2 font-bold'>
                        <div className='pb-4 text-center'>Let us know if you have any question!:</div>
                        <div className='text-center pb-4'>
                            Want to schedule your first class?
                            <div className='mt-2'>
                                <a href={'https://calendly.com/bitoverflow/quickchat'} target="_blank" rel="noopener noreferrer" className='text-lg bg-yoga-green mt-2 text-black rounded-lg p-2 hover:text-blue-400 cursor-pointer'>
                                    Click Here
                                </a>
                            </div>                            
                        </div>
                        <div className='grid place-items-center'>
                            Hit us up on Instagram:
                            <a href={'https://www.instagram.com/neuroyogainst/'} target="_blank" rel="noopener noreferrer" className='text-5xl hover:text-yoga-green cursor-pointer'>
                                <FaInstagram />
                            </a>
                        </div>                            
                        <div className='text-lg text-center pt-4 pb-8'>
                            Give us a call!
                            <br></br>
                            708-212-1156
                        </div>
                        {
                            visible && 
                            <div>
                                <div className="pl-2">Name</div>
                                <Field name="name" type="text"
                                        className="mt-1 p-2 block w-full rounded-md 
                                                    border-black border-2 focus:border-4 focus:font-bold "/>                        
                                <div className="pl-2">Email</div>
                                <Field name="email" type="text"
                                        className="mt-1 p-2 block w-full rounded-md 
                                                    border-black border-2 focus:border-4 focus:font-bold "/>
        
                                <div className="pl-2">What would you like to talk about?</div>
                                <Field name="note" type="text"
                                        className="mt-1 h-24 p-2 block w-full rounded-md 
                                                    border-black border-2 focus:border-4 focus:font-bold "/>                        
                                <div className='mt-3 pb-4'>
                                    <button type="submit" className="float-center mx-3 px-3 py-2 bg-indigo-300 rounded-md">Submit</button>
                                </div>
                            </div>

                        }
                        
                    </Form>
                )} />

            )
        }

    }

    return(
        <div>{item()}</div>
    )
}

export default Chat;
