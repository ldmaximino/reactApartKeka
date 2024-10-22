export const formatNroDoc = (nro_doc) => {
    const cleanDoc = nro_doc.toString().replace(/\D/g, ''); // Elimina cualquier carácter no numérico
    return cleanDoc.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
  };
  