  <ScrollView>
        {produtos.map((produto, index) => {
          return (
            <View style={estilos.content} key={produto.id}>
              <View style={estilos.imagem} />
              <View style={estilos.produto}>
                <View style={estilos.alinhamento}>
                  <Text style={estilos.titulo}>{produto.nome_produto}</Text>

                  {/* Carrinho de compras */}
                  <Pressable onPress={() => adicionarCarrinho(produto)}>
                    <Text style={estilos.carrinho}>
                      <Ionicons name="cart-outline" size={24} color="black" />
                    </Text>
                  </Pressable>
                </View>

                {/* contador de itens */}
                <View style={estilos.alinhamento}>
                  <Text style={estilos.descricao}>{produto.valor}</Text>
                  <View style={estilos.contador}>
                    <Pressable onPress={() => diminuir(index)}>
                      <Ionicons name="remove" size={24} color="black" />
                    </Pressable>
                    <Text style={estilos.numeroContador}>
                      {produto.quantidadeInicial}
                    </Text>
                    <Pressable onPress={() => acrescentar(index)}>
                      <Ionicons name="add" size={24} color="black" />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>


      <!-- asad -->
      <FlatList
      data={lista}
      style={estilos.list}
      renderItem={({ item }) => <ListaDeItem data={item} />}
      keyExtractor={(item) => item.id}
    />