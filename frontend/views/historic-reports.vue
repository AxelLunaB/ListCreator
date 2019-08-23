<template>
  <div id="app-historic-reports" class="animate">
    <div class="historic-titles">
      <h2>Historic reports</h2>
      <p>Filter by date</p>

      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
              <label>From</label>
              <date-picker
              :config="options"
              name="initDate"
              v-model="initDate"
              ></date-picker>
          </div>
          <div class="col-sm-12 col-md-6">
              <label>To</label>
              <date-picker
              :config="options"
              name="endDate"
              v-model="endDate"
              ></date-picker>
          </div>
        </div>
      </div>
      <div class="row" style="align-items:center;justify-content:center;align-items:center;margin-top:20px;">
        <button @click="filterByDate()" class="waves ripple default">send</button>
      </div>
    </div>
    <div style="text-align:center;" @click="printContract()">
      Generate PDF contract
    </div>
    <div class="willPrintContract d-none" id="willPrintContract">
      <p><b>CONTRATO DE PROMESA DE COMPRA VENTA, QUE CELEBRAN POR UNA PARTE, GIADA CONSULTING, S. DE R.L. DE C.V. REPRESENTADA EN ESTE ACTO POR HORIA TRAIAN CHIRIGUT, QUIEN EN LO SUCESIVO Y PARA EFECTOS DEL PRESENTE CONTRATO SERA REFERIDO COMO “EL PROMITENTE VENDEDOR”, Y POR LA OTRA PARTE ________</b>0_<b>_____, QUIEN EN LO SUCESIVO SERÁ REFERIDO COMO “EL PROMITENTE COMPRADOR”, AL TENOR DE LAS SIGUIENTES DECLARACIONES Y CLÁUSULAS. </b> </p>

      <br/>

      <p><b>DECLARACIONES</b></p>

      <br/>

      <p><b>PRIMERA. “EL PROMITENTE VENDEDOR” A TRAVÉS DE SU REPRESENTANTE LEGAL DECLARA: </b> </p>

      <br/>

      <ol type="a">
        <li>
          <p>Que es una persona moral constituida conforme a las leyes mexicanas, según consta en el instrumento notarial 657 de fecha 23 de noviembre de 2017, otorgado ante la fe del Lic. Ricardo Dehesa Cortes titular de la Notaría Pública 90 en el Estado de Quintana Roo, México, debidamente inscrita en el registro público de comercio bajo el folio mercantil electrónico número <b>N-2018015273</b>.</p>
        </li>
      </ol>

      <br/>

      <ol type="a" start="2">
        <li>
          <p>Que su representante cuenta con facultades necesarias para celebrar el presente contrato según consta en instrumento mencionado en el inciso anterior, y que sus facultades no le han sido revocadas ni limitadas en forma alguna.</p>
        </li>
      </ol>

      <br/>

      <ol type="a" start="3">
        <li>
          <p>Que se encuentra debidamente inscrita en el Registro Federal de Contribuyentes con el número <b>GCO171123H98</b>.</p>
        </li>
      </ol>

      <br/>

      <ol type="a" start="4">
        <li>
          <p>Que su domicilio es el ubicado en “Av. 10 sur, comercios, local 36, Manzana 3, Lote 1, Centro Plaza Paraíso Caribe, Playa del Carmen, Quintana Roo,77710” y para efectos de recibir notificaciones y avisos relativas al presente contrato, autoriza que sean llevadas a cabo mediante correo electrónico a la dirección electrónica <a href="mailto:office@giadarealestate.com">office@giadarealestate</a><a href="mailto:office@giadarealestate.com">.com</a>.</p>
        </li>
      </ol>

<br/>

<ol type="a" start="5"> <li><p>Que mediante escritura pública número ___ de fecha _____ otorgada ante la fe del Lic. _____ titular de la notaría pública número ___ del estado de ____, adquirió la propiedad del bien inmueble identificado como ____________, en lo sucesivo referido como <b>“EL TERRENO”</b></p>

</li>
</ol><p><br />
</p>

<ol type="a" start="6"> <li><p>Que en EL TERRENO, está llevando a cabo la construcción y desarrollo de un proyecto inmobiliario, que se sujetará al régimen de propiedad en condominio, y estará integrado por _1_ unidades habitacionales y _2_ locales comerciales, (en lo sucesivo referido como <b>“EL PROYECTO”</b>), el cual se describe en términos generales en el documento adjunto al presente contrato como <b>ANEXO “A”</b>, y que será comercialmente identificado como “<b>_______3______</b>”.</p>

</li>
</ol><p><br />
</p>

<ol type="a" start="7"> <li><p>Entre las unidades habitacionales que integran EL PROYECTO, se encuentra la identificada convencionalmente con el número __4__ (en lo sucesivo <b>“LA UNIDAD”</b>), en el entendido que dicha nomenclatura podrá variar atendiendo al determinado por las autoridades al formalizar el régimen de propiedad en condominio; cuyas dimensiones, acabados y características se describen en el <b>ANEXO “A”</b>. </p>

</li>
</ol><p><br />
</p>

<ol type="a" start="8"> <li><p>Que es su voluntad celebrar el presente contrato con la finalidad de celebrar en un futuro un contrato de compra venta de LA UNIDAD, bajo las bases y lineamientos aquí́ pactados así como con las formalidades establecidas en la ley. </p>

</li>
</ol><p><br />
</p>

<p><br />
</p>

<p><b>SEGUNDA. EL PROMITENTE COMPRADOR por su propio y personal derecho declara:</b></p>

<ol type="a"> <li><p>Que es una persona física de nacionalidad mexicana, mayor de edad, con capacidad legal y económica suficiente para obligarse en los términos del presente contrato, quien se identifica con ________5_______. </p>

</li>
</ol><p><br />
</p>

<ol type="a" start="2"> <li><p>Que su domicilio para efectos del presente contrato es el ubicado en ________6_______, y para efectos de recibir notificaciones y avisos relativas al presente contrato, autoriza que sean llevadas a cabo mediante correo electrónico a la dirección electrónica ______________7__________.</p>

</li>
</ol><p><br />
</p>

<ol type="a" start="3"> <li><p>Que los recursos con los cuales pagará a EL PROMITENTE VENDEDOR son de origen licito, por lo que en este acto se obliga a responder de cualquier afectación que EL PROMITENTE VENDEDOR pudiera tener en razón del origen de dichos recursos.</p>

</li>
</ol><p><br />
</p>

<ol type="a" start="4"> <li><p>Que es su voluntad celebrar el presente contrato con la finalidad de celebrar en un futuro un contrato de compra venta de LA UNIDAD, bajo las bases y lineamientos aquí́ pactados así como con las formalidades establecidas en la ley.</p>

</li>
</ol><p><br />
</p>

<p><b>TERCERA. Ambas partes declaran:</b></p>

<ol type="a"> <li><p>Que se reconocen mutuamente la personalidad con que comparecen a la celebración del presente instrumento. </p>

</li>
</ol><p><br />
</p>

<ol type="a" start="2"> <li><p>Que celebran el presente instrumento de manera voluntaria, libre y responsable, sin que al efecto exista dolo, lesión, error, violencia o mala fe y/o algún vicio de la voluntad que lo invalide. </p>

</li>
</ol><p><br />
</p>

<ol type="a" start="3"> <li><p>Que es su deseo obligarse en los términos del presente Instrumento. </p>

</li>
</ol><p><br />
</p>

<ol type="a" start="4"> <li><p>Que el presente acuerdo expresa la voluntad de ambas partes, por lo que no se puede considerar contrato de adhesión. </p>

</li>
</ol><p><br />
</p>

<p><br />
</p>

<p>En merito a lo anteriormente declarado, las partes celebran el presente contrato con sujeción a las siguientes: </p>

<p><br />
</p>

<p><b>CLÁUSULAS</b></p>

<p><br />
</p>

<p><b>PRIMERA. Objeto del Contrato. </b> </p>

<p>Por medio del presente contrato las partes se obligan a celebrar un contrato de compraventa por medio del cual EL PROMITENTE VENDEDOR transmita la propiedad y EL PROMITENTE COMPRADOR adquiera la propiedad de LA UNIDAD con todo cuanto de hecho y por derecho corresponda, con las formalidades establecidas por la ley y por las bases aquí pactadas y, cuyas medidas, especificaciones y acabados se estipulan en el ANEXO “A”, mismo que forma parte integral del presente contrato. </p>

<p><br />
</p>

<p><b>SEGUNDA. Formalización. </b> </p>

<p>El contrato de compraventa prometido deberá celebrarse bajo las formalidades establecidas por la ley, ante la fe de notario público, a más tardar 60 (sesenta) días posteriores a la entrega física de LA UNIDAD, siempre y cuando se cumplan con los requisitos, términos y condiciones pactados mediante el presente contrato.</p>

<p><br />
</p>

<p>Ambas partes establecen como condición suspensiva para la celebración del contrato prometido, la entrega de la garantía pactada mediante cláusula tercera, así como la constitución del régimen de propiedad en condominio.</p>

<p><br />
</p>

<p><b>TERCERA. – Precio y garantía. </b> </p>

<p>Las partes acuerdan fijar como precio justo por la transmisión de propiedad de LA UNIDAD en el contrato prometido, la cantidad de $___8____.00 USD (_____9_____ dólares 00/100, moneda de curso legal en Estados Unidos de América). La anterior cantidad deberá ser cubierta en su totalidad a más tardar el día en que se lleve a cabo la firma del contrato prometido.</p>

<p>Con el propósito de garantizar el cumplimiento de sus obligaciones, EL PROMITENTE COMPRADOR debe entregar a EL PROMITENTE VENDEDORy a título de arras, confirmatorias, la cantidad de $ ___10__.00 USD (_____11_____ dólares 00/100, moneda de curso legal en Estados Unidos de América), mismos que serán entregados de la siguiente manera:</p>

<p><br />
</p>

<ol> <li><p><a name="_Hlk2597239"></a> La cantidad de $ __12___.00 USD (____13______ dólares 00/100, moneda de curso legal en Estados Unidos de América) cantidad que se entregó a EL PROMITENTE VENDEDOR el día __ de ___ de 2019, EL PROMITENTE VENDEDOR manifiesta haber recibido a su entera satisfacción de dicha suma de dinero, sirviendo el presente contrato como recibo más amplio que en derecho proceda.</p>

</li>
</ol><p><br />
</p>

<ol start="2"> <li><p>La cantidad de $ ___14__.00 USD (____15______ dólares 00/100, moneda de curso legal en Estados Unidos de América), a más tardar a los 7 (siete) días posteriores a la fecha de firma del presente acuerdo y,</p>

</li>
</ol><p><br />
</p>

<ol start="3"> <li><p>La cantidad de $ __16___.00 USD (______17____ dólares 00/100, moneda de curso legal en Estados Unidos de América), a más tardar el día en que se lleve a cabo la entrega física de LA UNIDAD.</p>

</li>
</ol><p><br />
</p>

<p><a name="_Hlk2598045"></a> Las cantidades establecidas en el párrafo anterior, serán aplicadas al precio que se pacte en el contrato prometido y a solicitud de EL PROMITENTE COMPRADOR, al momento de llevarse a cabo la firma ante notario público del contrato prometido. En caso de efectuarse lo anterior, EL PROMITENTE COMPRADOR deberá llevar a cabo el pago por la cantidad de $ __18___.00 USD (____19______ dólares 00/100, moneda de curso legal en Estados Unidos de América) para que se tenga por totalmente cubierto el precio a pactarse en el contrato respectivo y en la fecha en que se lleve a cabo la firma del mismo.</p>

<p><br />
</p>

<p>Los montos anteriormente pactados deberán depositarse o transferirse a las cuentas bancarias siguientes: </p>

<p><br />
</p>

<p><b>PARA TRANSFERENCIAS VIA SPEI </b>(Transferencias nacionales en pesos)</p>

<p><br />
</p>

<p><b>BANCO: </b>MONEX (BMONEX)</p>

<p><b>BENEFICIARIO: </b>GIADA CONSULTING S DE RL DE CV</p>

<p><b>CUENTA: </b>3144128</p>

<p><b>CLABE: </b>112180000031441284</p>

<p><br />
</p>

<p><b>PARA TRANSFERENCIAS VIA SPID </b>(recepción de dólares usd desde otro banco dentro del País)</p>

<p><br />
</p>

<p><b>BANCO: </b>MONEX (BMONEX)</p>

<p><b>BENEFICIARIO: </b>GIADA CONSULTING S DE RL DE CV</p>

<p><b>R.F.C.: </b>GCO171123H98</p>

<p><b>CUENTA: </b>3144128</p>

<p><b>CLABE SPID: </b>112962000031441282</p>

<p><br />
</p>

<p><b>PARA TRANSFERENCIAS INTERNACIONALES EN DOLARES:</b></p>

<p><br />
</p>

<p><b>BANCO INTERMEDIARIO: </b>Standard Chartered Bank</p>

<p><b>DIRECCIÓN BANCO INTERMEDIARIO: </b>1095 Avenue of the Americas , New York City, N.Y. 10036, United States</p>

<p><b>SWIFT: </b>SCBLUS33</p>

<p><b>ABA: </b>026002561</p>

<p><b>CUENTA INTERBANCARIA: </b>3544039183001</p>

<p><br />
</p>

<p><b>BANCO BENEFICIARIO: </b>Banco Monex S.A.</p>

<p><b>SWIFT BANCO BENEFICIARIO: </b>MONXMXMM.</p>

<p><b>BENEFICIARIO: </b>GIADA CONSULTING, S de RL de CV.</p>

<p><b>CONTRATO: </b>3144128</p>

<p><br />
</p>

<p>EL PROMITENTE COMPRADOR asume la obligación de cubrir todo tipo de costo, cargo, comisión bancaria o cualquier otra cantidad que sea necesaria para llevar a cabo el pago a favor de EL PROMITENTE VENDEDOR.</p>

<p><br />
</p>

<p>EL PROMITENTE COMPRADOR deberá entregar en el domicilio o enviar vía correo electrónico a EL PROMITENTE VENDEDOR, copia del documento que acredite dichos pagos.</p>

<p><br />
</p>

<p>En caso de que el pago sea llevado a cabo mediante cheque, y éste no sea pagado por la institución bancaria por causas imputables a EL PROMITENTE COMPRADOR, éste deberá pagar a EL PROMITENTE VENDEDOR el 20% (veinte por ciento) del importe del título devuelto, de conformidad con lo establecido por el artículo 193 de la Ley General de Títulos y Operaciones de Crédito.</p>

<p><b>CUARTA. Modalidad de la compraventa prometida.</b></p>

<p>La transmisión de la propiedad prometida mediante el presente contrato se lleva a cabo bajo la modalidad <i>“ad corpus”</i>, motivo por el cual, el aumento o disminución de la superficie de LA UNIDAD en un porcentaje no mayor al 2% (dos por ciento) de lo pactado, no originará modificación al precio pactado, ni será causal de rescisión del presente contrato</p>

<p><b>QUINTA. - Entrega. </b> </p>

<p>Se entenderá por “Fecha de Entrega”, la fecha en que EL PROMITENTE VENDEDOR deberá hacer la entrega física de LA UNIDAD y a partir de la cual, EL PROMITENTE COMPRADOR tendrá la posesión de LA UNIDAD. La “Fecha de Entrega” deberá ocurrir a más tardar el día ________20_________, siempre y cuando EL PROMITENTE COMPRADOR haya cumplido con sus obligaciones. </p>

<p><br />
</p>

<p>Las partes acuerdan que EL PROMITENTE VENDEDOR tendrá un término de gracia de 30 (treinta) días naturales posteriores a la “Fecha de Entrega” para el caso de que tal entrega se demore por cualquier motivo (en lo sucesivo el “Período de Gracia”), período durante el cual no se generará penalidad alguna para EL PROMITENTE VENDEDOR.</p>

<p><br />
</p>

<p>Las partes acuerdan que en caso de que EL PROMITENTE VENDEDOR no entregue LA UNIDAD en la “Fecha de Entrega” y en el “Periodo de Gracia” anteriormente establecidos, se generará la obligación de EL PROMITENTE VENDEDOR de pagar a favor de EL PROMITENTE COMPRADOR la cantidad de $600.00 USD (seiscientos dólares 00/100, moneda de curso legal en los Estados Unidos de América) por cada mes de retraso. Dicha obligación de pago se generará a partir del primer día de cada mes excedido y podrá prolongarse hasta un máximo de 3 (tres) meses. Asimismo, las partes acuerdan que la presente obligación no se considerará incumplimiento ni será motivo de rescisión del presente acuerdo. </p>

<p><br />
</p>

<p>En caso de que EL PROMITENTE VENDEDOR no haya llevado a cabo la entrega de LA UNIDAD una vez transcurrido el plazo máximo de 3 (tres) meses establecido en el párrafo anterior, EL PROMITENTE COMPRADOR podrá a su elección, continuar acumulando el importe de $600.00 USD (seiscientos dólares 00/100 moneda de curso legal en los Estados Unidos de América) por cada mes que se retrase en dicha entrega, quedando vigentes las obligaciones de ambas partes o, rescindir el presente contrato con las consecuencias pactadas. </p>

<p><br />
</p>

<p>EL PROMITENTE VENDEDOR notificará a EL PROMITENTE COMPRADOR, con 30 (treinta) días naturales de anticipación, la fecha y hora de la entrega física de LA UNIDAD, por lo que EL PROMITENTE COMPRADOR deberá comparecer por sí o por medio de apoderado con facultades suficientes. </p>

<p><br />
</p>

<p>Dentro del periodo de 30 (treinta) días establecido en el párrafo anterior, las partes deberán inspeccionar LA UNIDAD para verificar que cumpla con las especificaciones establecidas en los anexos de este contrato. De esta inspección se levantará un acta (en lo sucesivo denominada el “Acta de Revisión”) en la cual se asentarán, en su caso, los detalles que no cumplan con tales especificaciones. En caso de que se verifique lo anterior, EL PROMITENTE VENDEDOR deberá reparar de los detalles mencionados en el “Acta de Revisión” en un término máximo de 30 (treinta) días posteriores a la fecha en que se verifique la inspección, sin que dicho término se considere incumplimiento en el término establecido para la entrega. </p>

<p><br />
</p>

<p>A partir de la entrega física de LA UNIDAD, EL PROMITENTE COMPRADOR será responsable de todos y cada uno de los gastos, cuotas de mantenimiento, impuestos y contribuciones propios de LA UNIDAD, asimismo, deberá asumir a su cargo los daños que sufra LA UNIDAD, incluyendo los que se deriven de casos fortuitos o de fuerza mayor.</p>

<p><br />
</p>

<p><b>SEXTA. Mobiliario.</b></p>

<p>Las partes acuerdan que EL PROMITENTE VENDEDOR entregará LA UNIDAD amueblada y equipada, de conformidad con el ANEXO “B” y que genera obligación de pago diversa de la establecida mediante cláusula tercera, que es por la cantidad de $___21__.00 USD (_____22____ dólares 00/100 moneda de curso legal en Estados Unidos de América), mismo que EL PROMIENTE COMPRADOR se obliga a pagar a más tardar el día _______23_______. </p>

<p><br />
</p>

<p><b>SEPTIMA. Obligaciones de EL PROMITENTE COMPRADOR:</b></p>

<p>EL PROMITENTE COMPRADOR, se obliga a:</p>

<p><br />
</p>

<ol> <li><p><a name="_Hlk2598240"></a> Entregar las cantidades en garantía y en las fechas pactadas.</p>

</li>
<li><p>Pagar en su momento, el precio a pactarse en el contrato prometido.</p>

</li>
<li><p>Proporcionar la información y documentación solicitada por la notaría designada, para la celebración del contrato prometido.</p>

</li>
<li><p>Sujetarse a las obligaciones, términos y condiciones establecidos en el Reglamento de Régimen de Propiedad Inmueble en Condominio que se apruebe por la autoridad competente para EL PROYECTO.</p>

</li>
<li><p>Cubrir oportunamente las cuotas de mantenimiento al efecto fijadas por la administración de EL PROYECTO a partir de le sea entregada físicamente LA UNIDAD.</p>

</li>
<li><p>Acudir puntualmente a la fecha de la entrega física de LA UNIDAD e inspección.</p>

</li>
</ol><p><br />
</p>

<p><b>OCTAVA. Obligaciones de EL PROMITENTE VENDEDOR:</b></p>

<ol> <li><p>Entregar LA UNIDAD en la “Fecha de Entrega” establecida, con las prórrogas y periodo de gracia acordados.</p>

</li>
<li><p>Entregar LA UNIDAD con las especificaciones pactadas en los anexos.</p>

</li>
<li><p>Constituir el régimen de propiedad en condominio de conformidad con las declaraciones del presente contrato.</p>

</li>
<li><p>Proporcionar la documentación requerida por la notaría designada para la celebración del contrato prometido.</p>

</li>
<li><p>Una vez cumplidas las obligaciones previas, transmitir la propiedad de LA UNIDAD a favor de EL PROMITENTE COMPRADOR, con todo cuanto de hecho y por derecho corresponda con las formalidades establecidas en la ley.</p>

</li>
<li><p>Responder por los vicios ocultos que llegue a presentar LA UNIDAD durante el plazo señalado para tal efecto por la legislación aplicable. </p>

</li>
</ol><p><br />
</p>

<p><b>NOVENA. Rescisión. </b> </p>

<p>En caso de que alguna de las partes no cumpla con cualquiera de las obligaciones asumidas conforme a este contrato, la parte afectada tendrá derecho a rescindir el presente contrato, sin responsabilidad alguna y sin necesidad de declaración judicial, mediante simple notificación a la otra parte. Para tales efectos, la parte que hubiese incumplido gozará de un plazo de 5 días naturales contados a partir de la notificación correspondiente para manifestar lo que a su derecho convenga y, para subsanar de ser posible, cualquier incumplimiento en que haya incurrido. </p>

<p><br />
</p>

<p>Asimismo, en caso de rescisión del contrato por incumplimiento de EL PROMITENTE VENDEDOR, éste deberá rembolsar a EL PROMITENTE COMPRADOR las cantidades entregadas de conformidad con la cláusula tercera, más un importe equivalente al 20% (vente por ciento) de la cantidad efectivamente entregada por EL PROMITENTE COMPRADOR, por concepto de pena convencional. </p>

<p><br />
</p>

<p>En caso de rescisión del contrato por incumplimiento de EL PROMITENTE COMPRADOR, éste deberá pagar como pena convencional a EL PROMITENTE VENDEDOR la cantidad correspondiente al 20% (veinte por ciento) del precio pactado por la transmisión de propiedad de LA UNIDAD mediante cláusula tercera; para lo anterior, EL PROMITENTE COMPRADOR autoriza a EL PROMITENTE VENDEDOR retener de las cantidades entregadas a título de arras confirmatorias dicha cantidad, y en caso de existir remanente, éste se reembolsará a EL PROMITENTE COMPRADOR</p>

<p><br />
</p>

<p><b>DÉCIMA.- Cesión de derechos. </b> </p>

<p>EL PROMITENTE COMPRADOR podrá ceder, traspasar o transmitir a favor de terceras personas los derechos del presente acuerdo para lo cual, deberá notificar a EL PROMITENTE VENDEDOR al menos 5 (días) previos a la celebración del acto en que conste la cesión, traspaso o transmisión respectiva. </p>

<p><br />
</p>

<p><b>DÉCIMA PRIMERA.- Impuestos y gastos.</b></p>

<p>Todos los impuestos, derechos, gastos, honorarios notariales y cualquier otra erogación que se derive de la celebración y formalización del contrato prometido mediante el presente acuerdo, serán por cuenta y a cargo de EL PROMITENTE COMPRADOR, a excepción del impuesto sobre la renta que corresponda a EL PROMITENTE VENDEDOR conforme a las disposiciones legales aplicables. </p>

<p><br />
</p>

<p>EL PROMITENTE COMPRADOR se hace sabedor y se compromete a realizar el pago del impuesto sobre adquisición de bienes inmuebles en los términos de la ley de la materia. </p>

<p><br />
</p>

<p><b>DÉCIMA SEGUNDA.- Avisos y notificaciones. </b> </p>

<p>Cualquier notificación, solicitud o requerimiento, deberá ser hecho al domicilio o correo electrónico establecido en el capítulo de declaraciones. </p>

<p><br />
</p>

<p>En caso de que hubiere algún cambio de domicilio o correo electrónico, la parte que hubiese cambiado su domicilio, deberá notificarlo a la otra parte y en caso de no hacerlo, los avisos y las notificaciones que se les haga al último domicilio y correo electrónico señalado surtirán plenamente sus efectos legales y liberarán a la otra parte de cualquier responsabilidad. </p>

<p><b>DÉCIMA TERCERA.- Jurisdicción. </b> </p>

<p>Para la solución de cualquier controversia derivada de la interpretación, ejecución y/o cumplimiento de este contrato, las partes se someten en forma expresa a la jurisdicción de los Tribunales competentes de la Ciudad de Playa del Carmen, Quintana Roo, renunciando expresamente a cualquier otro fuero que en virtud de su domicilio presente o futuro pudiera corresponderles. </p>

<p><br />
</p>

<p><b>DÉCIMA CUARTA.- Ausencia de vicios.</b></p>

<p>Las partes declaran que en la celebración de este contrato no existe error, dolo, violencia, mala fe, o cualquier otro vicio que pudiera invalidarlo.</p>

<p><br />
</p>

<p><b>DÉCIMA QUINTA. - Disposiciones generales. </b> </p>

<p>Ambas partes están de acuerdo en que los encabezados de las cláusulas que anteceden, han sido asentados exclusivamente para fines de facilidad de referencia, sin que por ello deban utilizarse para interpretar el contenido de las mismas o la voluntad de las partes. </p>

<p><br />
</p>

<p><a name="_GoBack"></a> Enteradas de su contenido y alcance, y sabedoras de las obligaciones que por virtud del presente contrato contraen, ambas partes lo firman al margen y al calce, por duplicado, quedando un ejemplar en poder de cada una de ellas, en Playa del Carmen, Municipio de Solidaridad, Quintana Roo, a los __24__ días del mes de __25__ del ___26__. </p>

<p><br />
</p>

<p><br />
</p>

<table border="1" bordercolor="#00000a" cellpadding="7" cellspacing="1"> <colgroup><col > <col > </colgroup>
<tbody>
<tr valign="TOP"> <td><p><br />
</p>

<p><br />
</p>

<p><br />
</p>

<p><br />
</p>

<p><br />
</p></td>
<td><p><br />
</p></td>
</tr>

<tr valign="TOP"> <td><p>“<b>EL PROMITENTE VENDEDOR”</b></p>

<p>GIADA CONSULTING, S. DE R.L. DE C.V.</p>

<p>Representada por </p>

<p>HORIA TRAIAN CHIRIGUT</p></td>
<td><p>“<b>EL PROMITENTE COMPRADOR”</b></p>

<p>______27_____</p></td>
</tr>

</tbody>
</table>

<p><br />
</p>

<table border="1" bordercolor="#00000a" cellpadding="7" cellspacing="1"> <colgroup><col > <col > </colgroup>
<tbody>
<tr valign="TOP"> <td><p><br />
</p>

<p><br />
</p>

<p><br />
</p></td>
<td><p><br />
</p>

<p><br />
</p>

<p><br />
</p>

<p><br />
</p>

<p><br />
</p></td>
</tr>

<tr valign="TOP"> <td><p><b>TESTIGO</b></p></td>
<td><p><b>TESTIGO</b></p>

<p><br />
</p>

<p><br />
</p></td>
</tr>

</tbody>
</table>

<p><br />
</p>

    </div>
    <div class="historic-body relative" v-if="watchMe">
      <table class="table" style="margin-bottom:0;">
          <thead>
          <tr>
            <td v-for="(t,index) in header" :key="index" style="border-bottom:none;" :class="responsiveTable(index)">
              {{ t.title }}
            </td>
          </tr>
        </thead>
      </table>
      <table class="table table-hover">
          <thead class="table-body" v-if="filterByDate != undefined">
          <tr v-for="(item,index) in depsAndContractsArray" :key="index" class="colors">
            <td class="responsive0" style="font-weight:bolder;">{{ item.cluster.abb != null ? item.cluster.abb : '-' }} </td>
            <td class="responsive1" style="font-weight:bolder;">{{ item.unitNumber != null ? item.unitNumber  :'-' }} </td>
            <td class="responsive2" style="font-size:14px;"> {{ item.customer.name != null ? item.customer.name  :'-' }} </td>
            <td class="responsive3"> {{ item.commission.executive.name != null ? item.commission.executive.name  :'-' }} </td>
            <td class="responsive4"> {{ item.reference.reserveDate != null ? toDate(item.reference.reserveDate) : '-' }} </td>
            <td class="responsive5"><i @click="print(item)" class="fas fa-file-pdf fa-lg hover-mouse"></i></td>
          </tr>
        </thead>
      </table>
    </div>
    <div class="historic-body" v-if="watchMe == false" style="display: flex;align-items: center;justify-content: center;">
      <p>Please choose a date range</p>
    </div>
    <nav class="pagination" role="navigation" aria-label="Page navigation" v-if="index != 0">
      <button class="btn btn-outline-light pagination-previous" v-on:click="prevPage">Previous</button>
      <ul class="pagination-list pagination-wrapper">
        <li v-for="n in pagesDisplay" :key="n" v-on:click="goToPage(n)" class="page-item">
          <a :class="pageClass(n)" aria-label="Goto page 1" class="page-link btn btn-outline-light">{{n+1}}</a>
        </li>
      </ul>
      <button class="btn btn-outline-light pagination-next" v-on:click="nextPage">Next</button>
    </nav>
    <!--Print section-->
    <div class="willPrint d-none" id="willPrint" style="font-family: 'Oswald', sans-serif;">
      <section class="hero print">
        <div class="container-header">
          <div class="container-inner-header">
            <h4>SALES REPORT</h4>
            <img src="https://i.imgur.com/jqiuuYB.png" width="150px">
          </div>
          <div class= "container-date">
            <p id="date"></p>
            <p>Tulum, Quintana Roo, México</p>
          </div>
        </div>
        <div class="container-body">
          <h4 style="margin-bottom:0;">CONTRACT INFORMATION</h4>
          <div class="flex" >
            <div>
              <h6>CLOSING DATE</h6>
                <p id="closingDate"></p>
              <h6>CUSTOMER</h6>
                <p id="customer"></p>
              <h6>COUNTRY</h6>
                <p id="country"></p>
              <h6>STATE</h6>
                <p id="state"></p>
              <h6>ADDRESS</h6>
                <p id="address"></p>
              <h6>PHONE</h6>
                <p id="customerPhone"></p>
              <h6>EMAIL</h6>
                <p id="customerEmail"></p>
            </div>
            <div>
              <h6>DISCOUNT</h6>
                <p id="discount"></p>
              <h6>EXCHANGE RATE</h6>
                <p id="exchangeRate"></p>
              <h6>ROI</h6>
                <p id="roi"></p>
              <h6>EXECUTIVE</h6>
                <p id="executive"></p>
              <h6>CONTACT INFO</h6>
                <p id="phoneExec"></p>
                <p id="emailExec"></p>
              <h6>PAYMENT METHOD</h6>
                <p id="paymentMethod"></p>
              <h6>RESERVE DATE</h6>
                <p id="reserveDate"></p>
              <h6>EXPIRATION DATE</h6>
                <p id="reserveExpiration"></p>
            </div>
          </div>
        </div>
        <div class="container-body">
          <h4 style="margin-bottom:0;">DEPARTMENT INFORMATION</h4>
            <div class="flex">
                <div>
                  <h6 style="margin-bottom:0;">CLUSTER</h6>
                  <p id="clusterName" style="margin-top:0;"></p>
                  <h6 style="margin-bottom:0;">UNIT No.</h6>
                  <p id="unitNo" style="margin-top:0;"></p>
                </div>
                <div>
                  <h6 style="margin-bottom:0;">LEVEL</h6>
                  <p id="level"></p>
                  <h6 style="margin-bottom:0;">STATUS</h6>
                  <p id="statusName" style="margin-top:0;"></p>
                </div>
                <div>
                  <h6 style="margin-bottom:0;">PRICE</h6>
                  <p id="priceTotal"></p>
                  <h6 style="margin-bottom:0;">CURRENCY</h6>
                  <p id="currency" style="margin-top:0;"></p>
                </div>
              </div>
          </div>
        <div class="container-body">
          <h4>PAYMENT INFORMATION</h4>
          <table class="table-payments">
              <thead>
              <tr>
                <td>PAYMENT No.</td>
                <td>DUE DATE</td>
                <td>PAYMENT DATE</td>
                <td>STATUS</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td id="dueDate1"></td>
                <td id="paymentDate1"></td>
                <td id="paymentStatus1"></td>
              </tr>
              <tr>
                <td>2</td>
                <td id="dueDate2"></td>
                <td id="paymentDate2"></td>
                <td id="paymentStatus2"></td>
              </tr>
              <tr>
                <td>3</td>
                <td id="dueDate3"></td>
                <td id="paymentDate3"></td>
                <td id="paymentStatus3"></td>
              </tr>
              <tr>
                <td>4</td>
                <td id="dueDate4"></td>
                <td id="paymentDate4"></td>
                <td id="paymentStatus4"></td>
              </tr>
              <tr>
                <td>5</td>
                <td id="dueDate5"></td>
                <td id="paymentDate5"></td>
                <td id="paymentStatus5"></td>
              </tr>
              <tr>
                <td>6</td>
                <td id="dueDate6"></td>
                <td id="paymentDate6"></td>
                <td id="paymentStatus6"></td>
              </tr>
              <tr>
                <td>7</td>
                <td id="dueDate7"></td>
                <td id="paymentDate7"></td>
                <td id="paymentStatus7"></td>
              </tr>
              <tr>
                <td>8</td>
                <td id="dueDate8"></td>
                <td id="paymentDate8"></td>
                <td id="paymentStatus8"></td>
              </tr>
              <tr>
                <td>9</td>
                <td id="dueDate9"></td>
                <td id="paymentDate9"></td>
                <td id="paymentStatus9"></td>
              </tr>
              <tr>
                <td>10</td>
                <td id="dueDate10"></td>
                <td id="paymentDate10"></td>
                <td id="paymentStatus10"></td>
              </tr>
              <tr>
                <td>11</td>
                <td id="dueDate11"></td>
                <td id="paymentDate11"></td>
                <td id="paymentStatus11"></td>
              </tr>
              <tr>
                <td>12</td>
                <td id="dueDate12"></td>
                <td id="paymentDate12"></td>
                <td id="paymentStatus12"></td>
              </tr>
            </tbody>
          </table>
          <h5 style="margin-bottom:0;">Total sales</h5>
          <p id="totalSale"></p>
        </div>
      </section>
    </div>
    <!-- End of print section -->
  </div>
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker';
import $ from "jquery";
import { mapGetters } from "vuex";
import { Printd} from 'printd';
import io from "socket.io-client";
import departmentHistoric from "./components/departmentHistoric.vue";
import cookie from "../utils/cookie";
import swal from "sweetalert";

const DEPARTMENT = 0;
const LOTS = 1;
const LOT_DETAIL = 2;
const DEPARTMENT_DETAIL = 3;


var socket = io();

export default {
  mounted: function () {
    const _ = this;
    this.$eventHub.$on("add-department-historic-detail", department => {
      this.selectedDepartment = department;
      this.view = DEPARTMENT_DETAIL;
      this.retrieveData();
    });
    socket.emit(
      "authenticate", {
        strategy: "jwt",
        accessToken: cookie()
      },
      function (message, data) {
        _.retrieveData();
      }
    );
    var isAuthenticated = this.$store.state.others.isAuthenticated;
    if (isAuthenticated) {
      // Dispatch actions &&  subscribe to rt events.
      this.$store.dispatch("users/getUsers");
      this.$store.dispatch("users/listenEvents");
      this.$store.dispatch("contracts/getContracts");


      // listen to authenticated event
    } else {
      let _ = this;
      this.$eventHub.$on("authenticated", function () {
        _.$store.dispatch("users/getUsers");
        _.$store.dispatch("users/listenEvents");
        _.$store.dispatch("contracts/getContracts");
        _.$store.dispatch("departments/getDepartments");


      });
    }
  },
  components: {
    departmentHistoric
  },
  data() {
    return {
      header:[
        {title:'TOWER'},
        {title:'UNIT'},
        {title:'CLIENT'},
        {title:'EXECUTIVE'},
        {title:'DATE'},
        {title:'INFO'}
      ],
      index:0,
      initDate: null,
      endDate:null,
      selectedDepartment:{},
      watchMe: false,
      depsAndContractsArray:[],
      contractsArray: [],
      options: {
          format: 'YYYY-MM-DD'
      },
    }
  },
  methods:{
    toPrice(x) {
      var r = x.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      return r;
    },
        filterByDate(){
      this.depsAndContractsArray = []
      var init = this.initDate
      var end = this.endDate
      this.contractsArray = []
      var newE = {}

      if(this.initDate != null && this.endDate != null) {
        var newW = {}
        for(var i = 0 ; i < this.contracts.length ; i++ ) {
            if(this.contracts[i].reference != undefined){
              var current = this.contracts[i].reference.reserveDate
              if(current >= init && current <= end) {
                this.depsAndContractsArray.push(this.contracts[i])
                }
              }
            }
            if(this.depsAndContractsArray == 0 ) {
              if(this.initDate != null || this.endDate != null)
            swal({
              text: `No apartments within range`,
              icon: "error",
              buttons: false,
              timer: 1500
          });
            }
            this.watchMe = true
          }
          console.log(this.depsAndContractsArray)

          for(var i = 0 ; i < this.depsAndContractsArray.length ; i++ ) {
            for(var e = 0 ; e < this.departments.length ; e++ ) {
              if(this.depsAndContractsArray[i].id == this.departments[e].id) {
                this.contractsArray.push(this.departments[e])
                }
              }
            }
            for ( var a = 0 ; a < this.depsAndContractsArray.length ; a ++ ) {
              newE = Object.assign(this.depsAndContractsArray[a],this.contractsArray[a])
              }

          this.depsAndContractsArray.sort((a,b) => (a.reference.reserveDate > b.reference.reserveDate) ? 1 : ((b.reference.reserveDate > a.reference.reserveDate) ? -1 : 0));
          return this.depsAndContractsArray

      },
    toDate(date){
      var year = date.substring(0,4)
      var month = date.substring(5,7)
      var day = date.substring(8,10)
      return day +'/'+ month + '/'+ year
    },
    responsiveTable(n){

        return 'responsive' + n

      },
      printContract(){
        const CSScontract = `
        .willPrintContract p {
          margin:0;
          text-align: justify;
          text-justify: inter-word;
        }

        .willPrintContract {
          font-family: Arial, sans-serif;
        }
        `
      const e = new Printd();
      e.print(document.getElementById('willPrintContract'),[CSScontract])

      },
      print(item){
      const monthName = m => new Date(0, m).toLocaleString('en-US', { month: 'long' })

      var today = new Date();
      var month = today.getMonth();
      var dd = today.getDate();
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = '0' + dd;
      }


      document.getElementById("date").innerHTML = monthName(month)+ " " + dd + " " + yyyy ;
      $('#executive').html(item.commission.executive.name ? item.commission.executive.name : '-' );
      $('#customer').html(item.customer.name ? item.customer.name : '-');
      $('#phoneExec').html(item.salesDetails.executive.contactNumber ? item.salesDetails.executive.contactNumber : '-');
      $('#emailExec').html(item.salesDetails.executive.email ? item.salesDetails.executive.email : '-');
      $('#country').html(item.customer.country ? item.customer.country : '-');
      $('#state').html(item.customer.state ? item.customer.state : '-');
      $('#address').html(item.customer.address ? item.customer.address : '-');
      $('#customerPhone').html(item.customer.contactNumber ? item.customer.contactNumber : '-');
      $('#customerEmail').html(item.customer.email ? item.customer.email : '-');
      $('#paymentMethod').html(item.paymentMethod ? item.paymentMethod : '-');
      $('#reserveDate').html(item.reference.reserveDate ? item.reference.reserveDate.substring(0,10) : '-');
      $('#reserveExpiration').html(item.reference.reserveExpiration ? item.reference.reserveExpiration.substring(0,10) : '-');
      $('#clusterName').html(item.cluster.name ? item.cluster.name : '-');
      $('#level').html(item.level ? item.level : '-');
      $('#statusName').html(item.status.name ? item.status.name : '-');
      $('#unitNo').html(item.unitNumber ? item.unitNumber : '-');
      $('#priceTotal').html(item.priceTotal ? item.priceTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ".00" : '-');
      $('#currency').html(item.currency ? item.currency : '-');
      $('#dueDate1').html(item.payments ? item.payments.paymentsDetails[0].dueDate ? item.payments.paymentsDetails[0].dueDate : '-' : '-');
      $('#dueDate2').html(item.payments ? item.payments.paymentsDetails[1].dueDate ? item.payments.paymentsDetails[1].dueDate : '-' : '-');
      $('#dueDate3').html(item.payments ? item.payments.paymentsDetails[2].dueDate ? item.payments.paymentsDetails[2].dueDate : '-' : '-');
      $('#dueDate4').html(item.payments ? item.payments.paymentsDetails[3].dueDate ? item.payments.paymentsDetails[3].dueDate : '-' : '-');
      $('#dueDate5').html(item.payments ? item.payments.paymentsDetails[4].dueDate ? item.payments.paymentsDetails[4].dueDate : '-' : '-');
      $('#dueDate6').html(item.payments ? item.payments.paymentsDetails[5].dueDate ? item.payments.paymentsDetails[5].dueDate : '-' : '-');
      $('#dueDate7').html(item.payments ? item.payments.paymentsDetails[6].dueDate ? item.payments.paymentsDetails[6].dueDate : '-' : '-');
      $('#dueDate8').html(item.payments ? item.payments.paymentsDetails[7].dueDate ? item.payments.paymentsDetails[7].dueDate : '-' : '-');
      $('#dueDate9').html(item.payments ? item.payments.paymentsDetails[8].dueDate ? item.payments.paymentsDetails[8].dueDate : '-' : '-');
      $('#dueDate10').html(item.payments ? item.payments.paymentsDetails[9].dueDate ? item.payments.paymentsDetails[9].dueDate : '-' : '-');
      $('#dueDate11').html(item.payments ? item.payments.paymentsDetails[10].dueDate ? item.payments.paymentsDetails[10].dueDate : '-' : '-');
      $('#dueDate12').html(item.payments ? item.payments.paymentsDetails[11].dueDate ? item.payments.paymentsDetails[11].dueDate : '-' : '-');
      $('#paymentDate1').html(item.payments ? item.payments.paymentsDetails[0].paymentDate ? item.payments.paymentsDetails[0].paymentDate : '-': '-');
      $('#paymentDate2').html(item.payments ? item.payments.paymentsDetails[1].paymentDate ? item.payments.paymentsDetails[1].paymentDate : '-': '-');
      $('#paymentDate3').html(item.payments ? item.payments.paymentsDetails[2].paymentDate ? item.payments.paymentsDetails[2].paymentDate : '-': '-');
      $('#paymentDate4').html(item.payments ? item.payments.paymentsDetails[3].paymentDate ? item.payments.paymentsDetails[3].paymentDate : '-': '-');
      $('#paymentDate5').html(item.payments ? item.payments.paymentsDetails[4].paymentDate ? item.payments.paymentsDetails[4].paymentDate : '-': '-');
      $('#paymentDate6').html(item.payments ? item.payments.paymentsDetails[5].paymentDate ? item.payments.paymentsDetails[5].paymentDate : '-': '-');
      $('#paymentDate7').html(item.payments ? item.payments.paymentsDetails[6].paymentDate ? item.payments.paymentsDetails[6].paymentDate : '-': '-');
      $('#paymentDate8').html(item.payments ? item.payments.paymentsDetails[7].paymentDate ? item.payments.paymentsDetails[7].paymentDate : '-': '-');
      $('#paymentDate9').html(item.payments ? item.payments.paymentsDetails[8].paymentDate ? item.payments.paymentsDetails[8].paymentDate : '-': '-');
      $('#paymentDate10').html(item.payments ? item.payments.paymentsDetails[9].paymentDate ? item.payments.paymentsDetails[9].paymentDate : '-': '-');
      $('#paymentDate11').html(item.payments ? item.payments.paymentsDetails[10].paymentDate ? item.payments.paymentsDetails[10].paymentDate : '-': '-')
      $('#paymentDate12').html(item.payments ? item.payments.paymentsDetails[11].paymentDate ? item.payments.paymentsDetails[11].paymentDate : '-': '-');
      $('#paymentStatus1').html(item.payments ? item.payments.paymentsDetails[0].status ? item.payments.paymentsDetails[0].status.name : '-': '-');
      $('#paymentStatus2').html(item.payments ? item.payments.paymentsDetails[1].status ? item.payments.paymentsDetails[1].status.name : '-': '-');
      $('#paymentStatus3').html(item.payments ? item.payments.paymentsDetails[2].status ? item.payments.paymentsDetails[2].status.name : '-': '-');
      $('#paymentStatus4').html(item.payments ? item.payments.paymentsDetails[3].status ? item.payments.paymentsDetails[3].status.name : '-': '-');
      $('#paymentStatus5').html(item.payments ? item.payments.paymentsDetails[4].status ? item.payments.paymentsDetails[4].status.name : '-': '-');
      $('#paymentStatus6').html(item.payments ? item.payments.paymentsDetails[5].status ? item.payments.paymentsDetails[5].status.name : '-': '-');
      $('#paymentStatus7').html(item.payments ? item.payments.paymentsDetails[6].status ? item.payments.paymentsDetails[6].status.name : '-': '-');
      $('#paymentStatus8').html(item.payments ? item.payments.paymentsDetails[7].status ? item.payments.paymentsDetails[7].status.name : '-': '-');
      $('#paymentStatus9').html(item.payments ? item.payments.paymentsDetails[8].status ? item.payments.paymentsDetails[8].status.name : '-': '-');
      $('#paymentStatus10').html(item.payments ? item.payments.paymentsDetails[9].status ? item.payments.paymentsDetails[9].status.name : '-': '-');
      $('#paymentStatus11').html(item.payments ? item.payments.paymentsDetails[10].status ? item.payments.paymentsDetails[10].status.name : '-': '-');
      $('#paymentStatus12').html(item.payments ? item.payments.paymentsDetails[11].status ? item.payments.paymentsDetails[11].status.name : '-': '-');
      $('#totalSale').html(item.payments ? "$" + item.payments.totalSale.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '.00': '-');
      $('#roi').html(item.percent ? item.percent + '%' : '- %');
      $('#closingDate').html(item.closingDate ? item.closingDate : 'N/A');
      $('#discount').html(item.discount ? item.discount + '%' : '- %');
      $('#exchangeRate').html(item.exchangerate ? item.exchangerate : 'N/A');



      const cssText =`
        body,
        html {
          height:100%;
          width:100%;
          margin:0;
        }

        .flex div p {
          margin:0;
        }

        .flex div h5,
        .flex div h6 {
          margin:10px 0 5px 0;
        }

        .container-header,
        .container-body{
          width:100%;
          border: 1px solid #dfd756;
          padding:5px;
          box-sizing:border-box;
          margin: 5px 0 5px 0;
        }

        .container-inner-header,
        .container-date {
          text-align:center;
          display:flex;
          align-items:center;
          justify-content:space-between;
        }

        .willPrint p,
        .willPrint td{
          font-size:0.8rem;
        }

        .willPrint h4{
          margin-top:0;
        }

        .flex{
          display:flex;
          flex-direction:row;
          justify-content:space-between;
        }

        .willPrint table {
          width:100%;
          font-family: 'Oswald', sans-serif;
        }

        .willPrint .container-body table.table-payments {
          background:red!important;
        }

        table tr:nth-child(even) {
          background:#fffbba;
        }
          `
      const d = new Printd();
      d.print(document.getElementById('willPrint'),[cssText])
      },
    goToPage(page) {
      this.index = page;
      this.retrieveData();
      },
    prevPage() {
      if (this.index > 0) this.index = this.index - 1;
      this.retrieveData();
    },
    nextPage() {
      if (this.index < Math.floor(this.pages)) this.index = this.index + 1;
      this.retrieveData();
    },
    goToPage(page) {
      this.index = page;
      this.retrieveData();
    },
    pageClass(n) {
      var cssClass = "pagination-link ";

      cssClass += n === this.index ? "is-current" : "";
      // console.log(n,cssClass);

      return cssClass;
      },
    retrieveDepartmentHistorics(query) {
      const _ = this;
      var q = {
        $skip: _.index * _.limit
      };
      if (query != null || query != undefined) {
        for (var k in query) {
          q[k] = query[k];
        }
      }
      socket.emit("api/departments-historics::find", q, (error, department) => {
        _.total = department.total;
        _.limit = department.limit;
        _.pages = department.total / department.limit;
        _.departments = [];
        department.data.forEach(element => {
          _.departments.push(element);
        });
        _.dateArray = _.departments;
        });
      },
      retrieveData(){
        if (this.view === DEPARTMENT) {
          this.retrieveDepartmentHistorics();
          } else if (this.view === DEPARTMENT_DETAIL){
            this.retrieveDepartmentHistorics({
              departmentid: this.selectedDepartment.departmentid
              });
            }
          }
        },
    computed:{
      ...mapGetters({
        // users: "users/users"
        contracts: "contracts/contracts",
        departments: "departments/departments"
      }),
      getToday(){
        this.initDate = new Date();
        this.endDate = new Date();
      },
      pagesDisplay() {
        if (Math.ceil(this.pages) > 10) {
          var array = [0, 1];
          var start = this.index > 3 ? this.index : 4;
          for (var i = 0, j = start - 2; i < 5; i++) {
            var k = j + i;
            if (k <= Math.ceil(this.pages) - 3) {
              array.push(k);
            }
          }
          array.push(Math.ceil(this.pages) - 2);
          array.push(Math.ceil(this.pages) - 1);
          return array;
        } else {
          var array = [];
          for (i = 0; i < Math.ceil(this.pages); i++) {
            array.push(i);
          }
          return array;
        }
      }
    }
  }

</script>


<style lang="scss">

  @import 'node_modules/bootstrap/scss/bootstrap';
  @import 'node_modules/bootstrap-vue/src/index.scss';
  @import url('https://fonts.googleapis.com/css?family=Oswald&display=swap');
  @import '../../node_modules/pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

  html,
  body{
    height:100%;
    width:100%;
    background: #2a333c;
  }

  table .table-payments tr:nth-child(even) {
    background:#fffbba;
  }

  .relative {
    position:relative;
  }

  .hover-mouse{
    cursor:pointer;
  }

  .absolute {
    position:absolute;
    left:0;
    top:7px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  body #app-historic-reports .historic-body .table thead td {
    border-bottom:none;
  }

  #app-historic-reports {
  height: 100%;
  width: 100%;
  background: #2a333c;
  color:white;
  }

  [type="text"] {
    border: 1px solid #ffffff4b;
    background: #2a333c;
    }

  [type="text"]:focus {
    border: 1px solid #ffffff4b;
    background: #2a333c;
    border:none;
    box-shadow: none;
  }

  .historic-titles {
    background: #3c4857;
    padding: 20px;
    border-radius: 10px;
    width:80vw;
    max-width: 1000px;
    margin:100px auto 0 auto;
  }

    .historic-body {
    background: #3c4857;
    padding: 20px;
    border-radius: 10px;
    width:80vw;
    margin-top:50px;
    max-width: 1000px;
    margin:50px auto 50px auto;
  }

   .historic-body p {
    text-align: center;
    margin: 0;
   }

  .historic-titles h2,
  .historic-titles p {
    text-align: center;
  }

  .historic-body .table thead td {
    color:white;
    border-bottom:1px solid #a8a8a896;
    border-top:1px solid #a8a8a896;
    text-align: center;
    font-weight: bold;
  }

  .historic-body .table thead.table-body td {
    font-weight: 100;
  }

  .table-hover {
    table-layout: fixed;
  }

  .table-hover tr:hover {
    background: #2b353fb4;
  }

  .pagination-wrapper {
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-bottom:0;
    padding-left:0;
    list-style: none;
  }

  .pagination {
    width:80vw;
    margin-top:50px;
    max-width: 1000px;
  }

  .page-link {
    background: none;
  }

  .responsive0,
  .responsive1,
  .responsive4 {
    width:100px;
  }

  .responsive5{
    width:80px;
  }

  .responsive3{
    width:150px;
  }

button.waves {
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  padding: 8px 18px;
  margin: 10px 1px;
  font-size: 14px;
  text-transform: uppercase;
  background: transparent;
  color: rgba(0, 0, 0, 0.87);
  background: #17a2b8;
  color: white;
  letter-spacing: 2px;
  font-weight: normal;
}
button.waves.ripple {
  overflow: hidden;
  position: relative;
  transition: background-color 0.3s linear, border 0.3s linear;
}
button.waves.ripple:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #000000 10%, rgba(0, 0, 0, 0) 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10);
  opacity: 0;
  transition: transform .5s, opacity 1s;
}
button.waves.ripple:active:after {
  transform: scale(0);
  opacity: .2;
  transition: 0s;
}
button.waves.default {
  background-color: #17a2b8;
  color: white;
  outline:none;
}

  td.responsive0,
  td.responsive1,
  td.responsive2,
  td.responsive3,
  td.responsive4,
  td.responsive5{
    padding: 6px 12px 6px 12px
  }

  .colors:nth-child(odd) {
  background: #425061;
}

  .bootstrap-datetimepicker-widget {
    background: #2a333c;
    color:white;
  }

   .animate {
    animation: fadeInAnimation 1s forwards;
  }

    @keyframes fadeInAnimation {
      0%   {
        opacity: 0;
         }

      100% {
        opacity: 1;
        }
    }

    @media (max-width: 1000px) {
      .responsive2{
        display: none;
      }
    }

    @media (max-width:578px){
      .responsive4{
        display:none;
      }
    }

      @media (max-width:768px){
        .responsive3{
          display:none;
        }
    }

      @media (max-width:411px){
        .responsive1{
          width:33%;
        }

        .responsive0{
          width:75px;
        }
    }

</style>
