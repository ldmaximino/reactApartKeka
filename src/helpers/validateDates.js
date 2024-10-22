export const validateDates = (datein, hourin, dateout, hourout) => {
    let msg="";
    const combDateIn = new Date(`${datein}T${hourin}`);
    const combDateOut = new Date(`${dateout}T${hourout}`);
    const difHours = combDateOut.getTime() - combDateIn.getTime();
    if(difHours < 10 * 60 * 60 * 1000) msg="Debe haber al menos 10hs entre el horario de ingreso y egreso";
    return msg;
};
