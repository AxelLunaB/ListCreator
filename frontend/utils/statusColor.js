module.exports = function (status) {
  if (status != undefined) {
    switch (status) {
      case 'VENDIDO':
        return{background: '#F68C1FFF',color: '#fff'};
      case 'APARTADO':
        return{background: '#FF4D52FF',color: '#fff'};
      case 'REFERENCIADO':
        return{background: '#354E99FF',color: '#fff'};
      case 'BLOQUEADO':
        return{background: '#A8A6A396',color: '#000'};
      default:
        return{background: '#F5F5F5',color: '#000'};
    }
  }
}
