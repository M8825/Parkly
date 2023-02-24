import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spots';
import SelectedState from '../SelectedStates/SelectedStates';
import './CreateSpotForm.scss';

const SpotForm = () => {
  const dispatch = useDispatch();
  const [zipCode, setZipCode] = useState('');
  const [photoUrl, setPhotoUrl] = useState([]);
  const [photoFile, setPhotoFile] = useState([]);
  const [carType, setCarType] = useState('');

  const [formData, setFormData] = useState({
    address: '',
    zipCode: '',
    city: '',
    state: '',
    hourlyRate: '',
    size: '',
    accessible: false,
    description: '',
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === '') {
      name = 'state';
    }
    value = value === 'on' ? true : value;

    if (name === 'hourlyRate') {
      value = value < 0 ? 0 : value;
    }

    if (name === 'zipCode') {
        if (value.length > 5) {
            // debugger
            // TODO: Fix zipcode input after presentation
            setZipCode(value);
        }
    }

    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newSpot = dispatch(createSpot(formData));
      
      setFormData({
        address: '',
        zipCode: '',
        city: '',
        state: '',
        size: '',
        accessible: false,
        description: '',
      });
    } catch (error) {
      console.error('Failed to create Spot:', error);
    }
  };

  const handleFileChange = e => {
	const file = e.target.files[0];
	if (file) {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = () => {
			setPhotoFile((prev) => ([...prev, file]));
			setPhotoUrl((prev) => ([...prev, fileReader.result]));
		};
	}
  };

    const attachedphotos = (
		<div className='image-preview'>
			<h2>Image preview{photoUrl}</h2>
			<img width='200px' src={photoUrl} alt='Preview' />
		</div>
	)

  return (
    <form className='createSpotForm' >
	  <div className='createSpotContainer'>
      	<h1 className='createSpotTitle'>Create a new Spot!</h1>
		<label className='createPageLabel'>
			<div className='inputTitle'>Title:</div>
			<div className='createPageTitle'>
			<input
        className='titleInput'
				type='text'
				name='title'
				value={formData.title}
				onChange={handleChange}
        placeholder='Title'
			/>
			</div>
		</label>
		<label className='createPageLabel'>
			<div className='inputTitle'>Address:</div>
			<div className='createSpotAddress'>
			<input
        className='addressInput'
				type='text'
				name='address'
				value={formData.address}
				onChange={handleChange}
        placeholder='Address'
			/>
			</div>
		</label>
    <div className='cityState'>
        <label className='createPageLabel'>
            <div className='inputTitle'>City:</div>
            <div>
            <input
                className='createSpotCity'
                type='text'
                name='city'
                value={formData.city}
                onChange={handleChange}
                placeholder='City'
            />
            </div>
        </label>
        <label className='createPageLabel'>
            <div className='dropdownList'>
            <SelectedState state={formData.state} handleChange={handleChange} />
            </div>
        </label>
        <label className='createPageLabel'>
            <div className='inputTitle'>Zip Code:</div>
            <input
            className='createSpotZip'
            type='text'
            name='zipCode'
            value={formData.zipCode}
            onChange={handleChange}
            placeholder='Zip Code'
            />
        </label>
    </div>
    <div className='rateType'>
        <label className='createPageLabel'>
            <div className='inputTitle'>Rate Per Hour:</div>
            <input
                className='createSpotRate'
                type='number'
                name='hourlyRate'
                value={formData.hourlyRate}
                onChange={handleChange}
                placeholder='$'
            />
        </label>
        <label className='createPageLabel'>
            <div className='inputTitle'>
                <div className='carType'>Car Type:</div>
                <select
                className='carTypeDrop'
                onChange={(e) => setCarType(e.target.value)}
                value={carType}>
                    <option value='Select'>Select</option>
                    <option value='Sedan'>Sedan</option>
                    <option value='SUV'>SUV</option>
                    <option value='Compact'>Compact</option>
                    <option value='Motorcycle'>Motorcycle</option>
                    <option value='Truck'>Truck</option>
                    <option value='Minivan'>Minivan</option>
                </select>
            </div>
        </label>
        <label className='createPageLabel'>
            <div className='inputTitle'>Accessibility:</div>
            <input
            type='checkbox'
            name='accessible'
            checked={formData.accessible}
            onChange={handleChange}
            />
        </label>
    </div>
    <label classname='createPageLabel'>
      <div className='inputDesc'>Description:
        <textarea placeholder='Description'></textarea>
      </div>
    </label>
		  {photoUrl.length < 5 && (
            <>
              <div>
                <input
                  label='Add a Picture'
                  type='file'
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              <h5>Image preview</h5>
              <div className='image-preview'>
                  {photoUrl.map(purl => {
                      return (
                          <img width='200px' src={purl} alt='Preview' />)
                  })}
              </div>
            </>
            )}
            {photoUrl.length > 4 && (
                <h1>Maximum photo is 5</h1>
            )}
		  <button className='createButton' type='submit'>Add Spot</button>
	  </div>
    </form>
  );
};

export default SpotForm;