# SearchingProblems
Trabalho de inteligência artificial sobre resolução de problemas por busca.

Guia para produção do trabalho
-------------------------------

O trabalho ficou dividido em quatro partes. Uma parte introdutória de apresentação
dos conceitos principais. Uma parte de apresentação do método geral de solução por busca,
e uma parte com implementações específicas de busca. A terceira parte, por conter 6 implementações,
foi dividia em duas de 3 implementações. Além dessas três partes, eu (Rafael) ficarei responsável
por elaborar um exemplo (implementação) de um problema que pode ser resolvido usando busca,
provavelmente o problema 8-puzzle, além de elaborar uma conclusão.

Cada um responsável pela sua parte deve fornecer material para os slides (texto e imagens),
e produzir um resumo da parte correspondente do livro.



Primeira (Douglas)
------------------

* Before an agent can start searching for solutions, it must formulate a goal and then use the
goal to formulate a problem.

* <b>A problem</b> consists of four parts: the <b>initial state</b>, a <b>set of operators</b>, a <b>goal test function</b>,
and a <b>path cost function</b>. The environment of the problem is represented by a <b>state space</b>.
<b>A path</b> through the state space from the initial state to a goal state is a <b>solution</b>.

* In real life most problems are ill-defined; but with some analysis, many problems can fit
into the state space model.

Segunda (Rafael)
----------------

* A single <b>general search</b> algorithm can be used to solve any problem; specific variants of
the algorithm embody different strategies.

* Search algorithms are judged on the basis of <b>completeness</b>, <b>optimality</b>, <b>time complexity</b>,
and <b>space complexity</b>. Complexity depends on <b>b</b>, the <b>branching factor</b> in the state space,
and <b>d</b>, the <b>depth of the shallowest solution</b>.

Terceira 1 (Vinicius)
---------------------

* <b>Breadth-first search</b> expands the shallowest node in the search tree first. It is complete,
optimal for unit-cost operators, and has time and space complexity of O(b<sup>d</sup>). The space
complexity makes it impractical in most cases.

* <b>Uniform-cost search</b> expands the least-cost leaf node first. It is complete, and unlike
breadth-first search is optimal even when operators have differing costs. Its space and time
complexity are the same as for breadth-first search.

* <b>Depth-first search</b> expands the deepest node in the search tree first. It is neither complete
nor optimal, and has time complexity of 0(b<sup>m</sup>) and space complexity of O(bm), where m is
the maximum depth. In search trees of large or infinite depth, the time complexity makes
this impractical.

Terceira 2 (Marcos)
-------------------

* <b>Depth-limited search</b> places a limit on how deep a depth-first search can go. If the limit
happens to be equal to the depth of shallowest goal state, then time and space complexity
are minimized.

* <b>Iterative deepening search</b> calls depth-limited search with increasing limits until a goal is
found. It is complete and optimal, and has time complexity of O(b<sup>d</sup>) and space complexity
of O(bd).

* <b>Bidirectional search</b> can enormously reduce time complexity, but is not always applicable.
Its memory requirements may be impractical.



