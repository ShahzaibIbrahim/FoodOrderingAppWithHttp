import classes from './Checkout.module.css';
import {useRef, useState} from 'react';

const Checkout = (props) => {

  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const [formValid, setFormValid] = useState(true);


  const isEmpty = value => value.trim().length > 0 ? true : false;

  const confirmHandler = (event) => {
    event.preventDefault();
    
    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostal = postalRef.current.value;
    const enteredCity = cityRef.current.value;

    const isValidName = !isEmpty(enteredName);
    const isValidStreet = !isEmpty(enteredStreet);
    const isValidPostal = !isEmpty(enteredPostal);
    const isValidCity = !isEmpty(enteredCity);

    if(!isValidName && !isValidStreet && !isValidPostal && !isValidCity) {
        setFormValid(true);
    } else {
        setFormValid(false);
        return;
    }

    props.onConfirm({
        name: enteredName, 
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef}/>
      </div>
      <div>
          {!formValid && <p className={classes.invalid}>All Fields must not be empty</p>}
          {formValid && <p className={classes.invalid}>Order Confirmed!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;