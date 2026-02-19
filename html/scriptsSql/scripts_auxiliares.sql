use jabuti;

# 	Interativo 	Pessoa 	Login 	Instituição 	Equipe 	Data Nasc. 	Email 	Ação


SELECT *  FROM `pessoa` where TIME_TO_SEC( TIMEDIFF( now(),  `ultimo_acesso`)) < 600;

select
interativo
id_pessoa,
p.nome,
login,
i.nome,
e.nome,
p.data_nascimento,
p.email



from pessoa p
left join equipe e on e.id_equipe=p.id_equipe
left join instituicao i on i.id_instituicao = e.id_instituicao
where p.id_pessoa_tipo > 1



--- view Logados ---
create or replace view vw_usuario_logado as 
select 
p.id_pessoa,
p.nome,
COALESCE( e.nome, '-nao informada-') as equipe_nome,
m.descricao as modulo_nome,
COALESCE( pm.conteudo, '') as conteudo,
pm.enviou,
TIME_TO_SEC( TIMEDIFF( now(), p.ultimo_acesso)) as tempo_logado,
TIME_TO_SEC( TIMEDIFF( now(), pm.ultima_atualizacao)) as tempo_parado
from pessoa p
join modulo m on p.id_modulo = m.id_modulo
left join instituicao i on p.id_instituicao = i.id_instituicao
left join equipe e on p.id_equipe = e.id_equipe
left join pessoa_modulo pm on p.id_pessoa = pm.id_pessoa and p.id_modulo = pm.id_modulo
where p.id_pessoa != 1 and TIME_TO_SEC( TIMEDIFF( now(),  `ultimo_acesso`)) < 6000;



<th>Pessoa</th>
<th>Instituição</th>
<th>Equipe</th>
<th>Data Nasc.</th>
<th>Email</th>

--- view Cadastrados ---
create or replace view vw_usuario_cadastrado as 
select 
p.id_pessoa,
p.nome,
COALESCE( i.nome, '-nao informada-') as instituicao_nome,
COALESCE( e.nome, '-nao informada-') as equipe_nome,
p.data_nascimento,
p.email
from pessoa p
left join instituicao i on p.id_instituicao = i.id_instituicao
left join equipe e on p.id_equipe = e.id_equipe


select id_sessao from sessao where dados_sessao like '%"id_pessoa":"-1"%' and estado = 1

select * from pessoa where id_pessoa = -1

update pessoa set ultimo_acesso = 0 where id_pessoa = -1


select * from vw_usuario_logado order by id_pessoa;



