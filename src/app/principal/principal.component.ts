import { Component } from '@angular/core';
import { Cliente } from '../Modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {

  //Objeto cliente
  cliente = new Cliente();

  // Variável para visibilidade dos botões
  btnCadastro:boolean = true;

  //Variável de visibilidade da tabela
  tabela:boolean = true;

  //JSON clientes
  clientes:Cliente[] = [];

  //Construtor
  constructor(private servico:ClienteService) {}

  //Método de seleção
  selecionar():void {
    this.servico.selecionar().subscribe(retorno => this.clientes = retorno);
  }

  //Cadastro
  cadastrar():void {
    this.servico.cadastrar(this.cliente).subscribe(retorno => {

      //Cadastrar o cliente no vetor
      this.clientes.push(retorno);

      //Limpar formulário
      this.cliente = new Cliente();

      //Msg
      alert('Cliente cadastrado com sucesso!')
    });
  }

  //Selecionar um cliente
  selecionarCliente(posicao:number):void {

    //Selecionar cliente no vetor
    this.cliente = this.clientes[posicao];

    //Visibilidade botões e tabela
    this.btnCadastro = false;
    this.tabela = false

  }

  //Método de edição
  editar():void{
    this.servico.editar(this.cliente).subscribe(retorno => {

      //Obter posição do cliente no vetor
      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo == retorno.codigo;
      })

      //Alterar dados
      this.clientes[posicao] = retorno;

      //Limpa formulário
      this.cliente = new Cliente;

      //Visibilidade botões e tabela
      this.btnCadastro = true;
      this.tabela = true;

      //Msg
      alert('Cliente alterado com sucesso!')

    })
  }

  //Método de remover
  remover():void{
    this.servico.remover(this.cliente.codigo).subscribe(retorno => {

      //Obter posição do cliente no vetor
      let posicao = this.clientes.findIndex(obj => {
        return obj.codigo == this.cliente.codigo;
      })

      //Remover cliente
      this.clientes.splice(posicao, 1);

      //Limpa formulário
      this.cliente = new Cliente;

      //Visibilidade botões e tabela
      this.btnCadastro = true;
      this.tabela = true;

      //Msg
      alert('Cliente removido com sucesso!')

    })
  }

  //Cancelar
  cancelar():void {
    //Limpa formulário
    this.cliente = new Cliente;

    //Visibilidade botões e tabela
    this.btnCadastro = true;
    this.tabela = true;
  }

  //Método de inicialização
  ngOnInit() {
    this.selecionar();
  }

}
