export const Formulario = ({
    guestInfo,
    handleChange,
    handleSubmit,
    handleVolver,
    inputError,
    focusRef,
  }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="text-center mt-4 guest-container">
        <div className="form-group">
          <label htmlFor="first_name">Nombre</label>
          <input
            ref={focusRef}
            type="text"
            name="first_name"
            value={guestInfo.first_name}
            onChange={handleChange}
            required
            className="form-control my-3 guest-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">Apellido</label>
          <input
            type="text"
            name="last_name"
            value={guestInfo.last_name}
            onChange={handleChange}
            required
            className="form-control my-3 guest-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dni">DNI</label>
          <input
            type="number"
            name="dni"
            id="dni"
            value={guestInfo.dni}
            onChange={handleChange}
            required
            className="form-control my-3 guest-input"
          />
        </div>
        <span>{inputError}</span>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary btn-enviar me-2">
            Enviar
          </button>
          <button className="btn btn-primary btn-enviar" onClick={handleVolver}>
            Volver
          </button>
        </div>
      </form> 
    </>
  )
}
