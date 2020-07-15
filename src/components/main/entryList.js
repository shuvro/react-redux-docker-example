import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getFormData, redirectToUrl, getAdditionalSigners, getSignerData, deleteSigner } from '../../actions'
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { InputField } from '../fields';
import ROUTES from '../../utils/routes';

class EntryListComponent extends Component {
  state = {
    signers: []
  }

  componentDidMount() {
    this.props.getAdditionalSigners();
  }

  onSignerEdit = (e, id) => {
    this.props.getSignerData({ id });
  }

  onSignerDelete = (e, id) => {
    this.props.deleteSigner({ id });
  }
  gotoStep = (e, step) => {
    this.props.redirectToUrl(step);
  }
  render() {
    const { config, form } = this.props;
    const signers = form.signers;
    const baseColor = { color: config.baseColor };
    return (
      <div>

        <div className='' style={{ marginTop: '100px' }}>
          <h5 style={baseColor} className='form-block-title' > FIRMANTES ADICIONALES </h5>

          <Table striped bordered hover style={{ marginTop: '80px' }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre Completo</th>
                <th>Numero de Cedula</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {signers.map(signer => {
                return (
                  <tr key={signer.id}>
                    <td>{signer.id}</td>
                    <td>{signer.fullname}</td>
                    <td>{signer.idNumber}</td>
                    <td>
                      <Button onClick={e => this.onSignerEdit(e, signer.id)} style={{ marginRight: '20px', width: '100px' }} variant="outline-secondary">Editar</Button>
                      <Button onClick={e => this.onSignerDelete(e, signer.id)} style={{ width: '100px' }} variant="outline-secondary">Eliminar</Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>

          {/*<Button onClick={e => this.props.redirectToUrl(ROUTES.A_FORM1)} style={{ float: 'right', width: '180px' }} target="_blank">Agregar Nuevo</Button>*/}
          <Row>
            <Col xs={0} md={7}></Col>
            <Col xs={12} md={5}>
              <Row>
                <Col xs={6} >
                  <Button variant="outline-secondary" onClick={e => this.gotoStep(e, ROUTES.FORM8)} style={{ float: 'right', width: '180px' }}>Continuar</Button>
                </Col>
                <Col xs={6} >
                  <Button style={{ float: 'right', width: '180px' }}><Link className="custom-a-tag" to={ROUTES.SIGNERS}>Agregar Firmante</Link></Button>
                </Col>
              </Row>
            </Col>
          </Row>

        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ config, form }) => ({
  config, form
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFormData,
      redirectToUrl,
      getAdditionalSigners,
      getSignerData,
      deleteSigner,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryListComponent)
