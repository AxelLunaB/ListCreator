const PdfPrinter = require('pdfmake');
const fonts = {
  Roboto: {
    normal: 'frontend/assets/fonts/TitilliumWeb-Regular.ttf',
    bold: 'frontend/assets/fonts/TitilliumWeb-Bold.ttf'
  }
};

const printer = new PdfPrinter(fonts);
const fs = require('fs');

module.exports = async function (context) {
  return new Promise((resolve) => {

  // Start creating a new pdf file
  // Return a new promise
  const { data } = context;

  // playground requires you to assign document definition to a variable called dd

var dd = {
    background: [ { image: 'frontend/assets/back_sib.png', height: 1650, width: 1275 } ],
    content: [
 	{
 	  style: 'tableExample',
 		layout: 'noBorders',
 	  table: {
 		widths: ['*', '*', '*', '*'],
 		body: [
 			['LOGO SIBARIA', '', '', 'LOGO CONTORNO'],
 			[' ', '', '', ' '],
			
 			]
 		}
 	},
		
 	{text:'¡ESTAS A UNOS PASOS DE COMENZAR A VIVIR LA VIDA BIEN VIVIDA!', bold:true, fontSize:15},

 		{
 			style: 'tableExample',
 			table: {
 				widths: ['*', '*', '*', '*'],
 				body: [
 					[
 					    {text:'',border:[false,false,false,false]},
 					    {text:'',border:[false,false,false,false]},
 					    {text:'',border:[false,false,false,false]},
 					    {text:'Fecha y hora',border:[true,true,true,true]}
 					],
					
 						[
 					    {text:'',border:[false,false,false,false]},
 					    {text:'',border:[false,false,false,false]},
 					    {text:'',border:[false,false,false,false]},
 					    {text:'Residencia',border:[true,true,true,true]}
 					],
 					[
 					    {text:'',border:[false,false,false,false]},
 					    {text:'',border:[false,false,false,false]},
 					    {text:'',border:[false,false,false,false]},
 					    {text:'Asesor',border:[true,true,true,true]},
					   
 					],
 				],
 			},
         	layout: {
         		hLineWidth: function (i, node) {
         			return 2;
         		},
         		vLineWidth: function (i, node) {
         			return 2;
        		}
         	}
 		},	
		
 		{
 		    text:'Paso 1 Apartado:', bold:true, fontSize:16, color:'#D70C8C' 
 		},
 		{
 		    text:'1- Realiza tu apartado en tiempo (en máximo 2 dias hábiles) y forma en las cuentas bancarias asignadas', margin: [0, 5, 0, 0 ]
 		},
 		{
 		    text:'¿Para que?', bold:'true', margin: [0, 5, 0, 0 ]
 		},
 		{
 		    text:' -Para asegurar precio y ubicación de tu próxima residencia', margin: [0, 5, 0, 0 ]
 		},
 		{
 		    text:'¿Como?', bold:'true', margin: [0, 5, 0, 5 ]
 		},

 		{text: [
 				{text:'A)- Mediante depósito en cuenta bancaria', style:'normal', bold:true},
 				{text: ' a nombre de ROCA ENCANTADA S.A DE C.V. Banco: BBVA Número de cuenta: 0105 8563 37', fontSize: 12},
 				{text:'\n Clabe: 0123 2000 1058 5633 76 Referencia:'},
 				{text:' ('},
 				{text:'No. De casa', color:'#968D97'},
 				{text:')'}
 	           ]
 		},
 		' ',
		{text: [
 				{text:'B)- Transferencia electrónica:', style:'normal', bold:true},
 				{text: ' Banco: BBVA Número de cuenta: 0105 8563 37', fontSize: 12},
 				{text:'\n Clabe: 0123 2000 1058 5633 76 Referencia:'},
 				{text:' ('},
 				{text:'No. De casa', color:'#968D97'},
 				{text:')'}
 	           ]
 		},
 		' ',
 		{text: [
 				{text:'C)- Depósito en efectivo', style:'normal', bold:true,},
				
 				{text: ' (Máximo $650,000.00 pesos mexicanos*):', fontSize: 12},
 				{text:'\n Banco; BBVA Número de cuenta: 0105 8563 37 Clabe:0123 2000 1058 5633 76.\nReferencia:'},
 				{text:' ('},
 				{text:'No. De casa', color:'#968D97'},
 				{text:') A nombre de ROCA ENCANTADA S.A DE C.V'}
 	           ]
 		},
 		' ',
 		{
 		    text:'Nota. Notifica via correo electrónico tu pago anexado tu comprobante digitalizado a: ventas@sibariaresidencia.com y recibirás correo electrónico de confirmación.', fontSize:10   
 		},
 		{
 		    text:'Paso 2 Firma oferta de compra:', bold:true, fontSize:16, color:'#D70C8C' , margin: [0, 5, 0, 0 ]
 		},
 		{
 		    text:'¿Para que?', bold:'true', margin: [0, 5, 0, 0 ]
 		},
 		{
 		    text:' -Para formalizar la operación.', margin: [0, 5, 0, 0 ]
 		},
 		{
 		    text:'¿Como?', bold:'true', margin: [0, 5, 0, 0 ]
 		},
 		{
 		    text:' -Acude con tu asesor de ventas con los siguientes documentos:', fontSize:13
 		},
 		{
 		    text:'-Copia identificación oficial vigente: INE o pasaporte.',fontSize:11, margin: [ 20, 10, 0, 0 ]
 		},
 		{
 		    text:'-Comprobante de domicilio (no mayor a 2 meses de antigüedad) agua, luz, teléfono ó estado de cuenta bancario.',fontSize:11, margin: [ 20, 5, 0, 0 ]
 		},
 		{
 		    text:'-Copia de acta de nacimiento.',fontSize:11, margin: [ 20, 5, 0, 0 ]
 		},
 		{
 		    text:'-Copia de acta de matrimonio (en su caso).',fontSize:11, margin: [ 20, 5, 0, 0 ]
 		},
 		{
        text:'-Copia de acta de nacimiento de conyuge.',fontSize:11, margin: [ 20, 5, 0, 0 ]
 		},
 		{
 		    text:'Nota: Dependiente del tipo de adquisición, cumple con tu programación de pagos establecidos en el Anexo "A" de tu oferta de compra',fontSize:11, margin: [0, 5, 0, 0 ]
 		},
 		' ',
 		{
 		    text:'*Con respecto al valorar total de la unidad privativa (residencia seleccionada). En base al Artículo 32 fracción de la LEY FEDERAL PARA LA PREVENSIÓN E IDENTIFICACIÓN DE OPERACIONES CON RECURSO DE PROCEDENCIA ILICITA \n -Capítulo IV "Del Uso de Efectivo y Metales"',fontSize:10
 		},
 		' ',
 		{
 		    text:'Nota: Nuestro personal no se encuentra autorizado para recibir pagos en efectivo bajo ningun concepto',fontSize:10
 		},
		
],
 	styles: {
 	    normal:{
 	   margin: [0, 5, 0, 0 ]  
 	    },
 		header: {
 			fontSize: 18,
 			bold: true,
 			margin: [0, 0, 0, 10]
 		},
 		subheader: {
 			fontSize: 16,
 			bold: true,
 			margin: [0, 10, 0, 5]
 		},
 		tableExample: {
 			margin: [0, 5, 0, 15]
 		},
 		tableHeader: {
 			bold: true,
 			fontSize: 13,
 			color: 'black'
 		}
 	},
 	defaultStyle: {
 		// alignment: 'justify'
 	}
	
}

  // Generate new chunks for file transfer
  const chunks = [];
  const pdfDoc = printer.createPdfKitDocument(dd, {});

    pdfDoc.on('data', function(chunk) {
      chunks.push(chunk);
    });

    pdfDoc.on('end', () => {
      // Concat all chunks to a new Buffer
      // to transfer to client side
      const base64data = Buffer.concat(chunks);

      // Add pdf data to context : Object
      context.data = {
        pdf: base64data
      };

      // Resolve the new context object for hook service call
      // to be skipped
      resolve(context);
    });

    pdfDoc.end();

  });
}