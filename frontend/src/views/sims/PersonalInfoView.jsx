// PersonalInfoForm.jsx
import React from 'react';
import PersonalInfoForm from '../../components/PersonalInfoForm';

export default function PersonalInfoView() {
  return (
    <div>
      <div className="container">
        <h2 className="text-center">Datos Personales</h2>
        <div className="row">
          <div className="col-md-6">
            <PersonalInfoForm />
          </div>
        </div>
      </div>
    </div>
  );
}
