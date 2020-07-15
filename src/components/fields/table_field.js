import React from 'react';
import { Form, Col, Table, Button } from 'react-bootstrap'
import NumberFormat from 'react-number-format';
import language from '../../constants/error-msg-definitions';
import ROUTES from '../../utils/routes'

const TableField = (props) => {
  let {
    name, label, type, validation, initialValue, isRequired, maxLength, minLength, display,
    action, helper, placeholder, onChange, desktopSize, cellphoneSize, tabletSize, error, mask, lang, autoFocus, blockIndex, addOrEdit,
    deletePartner
  } = props;
  let count = 1;
  let sum = 0;
  if (display === 'show') {
    return (
      <Col xs={cellphoneSize} md={desktopSize} >
        <Table striped bordered hover>
          <thead>
          <tr>
            <th style={{'width': '5%'}}>#</th>
            <th style={{'width': '20%'}}>Nombre</th>
            <th style={{'width': '10%'}}>Nacionalidad</th>
            <th style={{'width': '15%'}}>N° de identificación</th>
            <th style={{'width': '15%'}}>Porcentaje de Participación</th>
            <th style={{'width': '20%'}}>Acciones</th>
          </tr>
          </thead>
          <tbody>

          {initialValue && initialValue.map(singlePartner => {
            sum = parseInt(sum) + parseInt(singlePartner.partnerParticipationPercentage);
            return (
              <tr key={singlePartner.partnerIdentificationNumber}>
                <td>{count++}</td>
                <td>{singlePartner.partnerName}</td>
                <td>{singlePartner.partnerNationality}</td>
                <td>{singlePartner.partnerIdentificationNumber}</td>
                <td>{singlePartner.partnerParticipationPercentage}</td>
                <td>
                  <Button onClick={e => addOrEdit(ROUTES.PARTNERS + "/" + singlePartner.partnerIdentificationNumber)} style={{ marginRight: '20px', width: '100px' }} variant="outline-secondary">Editar</Button>
                  <Button onClick={e => deletePartner(singlePartner.partnerIdentificationNumber)} style={{ width: '100px' }} variant="outline-secondary">Eliminar</Button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </Table>
        {
          parseInt(sum) && parseInt(sum) < 100 ?
          <Button onClick={e => addOrEdit(ROUTES.PARTNERS + "/new")} style={{ float: 'right', width: '180px' }} target="_blank">Agregar Nuevo</Button>
          : ''
        }

      </Col>
    )
  } else {
    return '';
  }
}

export default TableField;
