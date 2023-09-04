import React from 'react';
import Button from '@material-ui/core/Button';

const LoadingButton = ({ isLoading,className,submit,btnTxt }) => {
        

  const buttonType = submit ? 'submit' : 'button'; // Determinar el tipo de botón

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={className ? className : ''}
        disabled={isLoading}
        type={buttonType} // Establecer el tipo de botón
      >
    {isLoading ? 'Cargando...' : btnTxt?btnTxt:'Guardar'}
      </Button>
    </div>
  );
};

export default LoadingButton;
