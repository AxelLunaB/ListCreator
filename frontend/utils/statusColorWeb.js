module.exports = function (status) {
  if (status != undefined) {
    switch (status) {
      case 'VENDIDO':
        return{background: '#C18484',color: '#FFFFFF'};
      case 'APARTADO':
        return{background: '#FFC166',color: '#FFFFFF'};
      case 'REFERENCIADO':
        return{background: '#FFFFFF',color: '#FFFFFF'};
      case 'BLOQUEADO':
        return{background: '#FFFFFF',color: '#FFFFFF'};
      default:
        return{background: '#84C184',color: '#FFFFFF'};
    }
  }
}


//FF5733
