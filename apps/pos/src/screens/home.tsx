import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { StatusBar } from 'expo-status-bar'
import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu'

const { Popover } = renderers

export const Menus = () => (
  <View className='bg-[#323B45] p-2'>
    <Menu renderer={Popover}>
      <MenuTrigger customStyles={{ triggerText: { color: 'white' } }}>
        <View className='flex flex-row items-center'>
          <Text className='text-white font-bold'>Tarde</Text>
          <MaterialIcons size={16} name='arrow-drop-down' color='white' />
        </View>
      </MenuTrigger>

      <MenuOptions customStyles={{ optionsContainer: { width: 100 } }}>
        <MenuOption disabled disableTouchable text='Menus' />
        <MenuOption onSelect={() => alert(`Save`)} text='Tarde' />
      </MenuOptions>
    </Menu>
  </View>
)

function LeftNavbar() {
  return (
    <View className='flex flex-col justify-between h-full w-full'>
      <View className='flex flex-col'>
        <FontAwesome.Button
          name='plus-circle'
          size={18}
          color='white'
          backgroundColor='transparent'
          className='flex flex-col border-b-2 border-[#2D2E34] px-[0.5px] py-3'
        >
          <Text className='text-white mt-2 text-[10px]'>Cantidad</Text>
        </FontAwesome.Button>
        <FontAwesome.Button
          name='dollar'
          size={18}
          color='white'
          backgroundColor='transparent'
          className='flex flex-col border-b-2 border-[#2D2E34] px-[0.5px] py-3'
        >
          <Text className='text-white mt-2 text-[10px]'>Precio</Text>
        </FontAwesome.Button>
        <FontAwesome.Button
          name='image'
          size={18}
          color='white'
          backgroundColor='transparent'
          className='flex flex-col border-b-2 border-[#2D2E34] px-[0.5px] py-3'
        >
          <Text className='text-white mt-2 text-[10px]'>Detalle</Text>
        </FontAwesome.Button>
        <FontAwesome.Button
          name='edit'
          size={18}
          color='white'
          backgroundColor='transparent'
          className='flex flex-col border-b-2 border-[#2D2E34] px-[0.5px] py-3'
        >
          <Text className='text-white mt-2 text-[10px]'>Modificar</Text>
        </FontAwesome.Button>
        <FontAwesome.Button
          name='money'
          size={18}
          color='white'
          backgroundColor='transparent'
          className='flex flex-col border-b-2 border-[#2D2E34] px-[0.5px] py-3'
        >
          <Text className='text-white mt-2 text-[8px]'>Reembolso</Text>
        </FontAwesome.Button>
      </View>
      <View className='flex flex-col'>
        <FontAwesome.Button
          name='user-circle-o'
          size={18}
          color='white'
          backgroundColor='transparent'
          className='flex flex-col border-t-2 border-[#2D2E34] px-1 py-3'
        >
          <Text className='text-white mt-2 text-[10px]'>Agregar</Text>
          <Text className='text-white text-[8px] font-bold'>Cliente</Text>
        </FontAwesome.Button>
        <FontAwesome.Button
          name='glass'
          size={18}
          color='white'
          backgroundColor='#F05152'
          className='flex flex-col border-t-2 border-[#2D2E34] px-1 py-3'
        >
          <Text className='text-white mt-2 text-[10px]'>Nancy</Text>
        </FontAwesome.Button>
      </View>
    </View>
  )
}

const products = [
  { id: '1', name: 'Carne Asada', plu: 'S1', price: '5.0', color: '#F4986F' },
  {
    id: '2',
    name: 'Empanada de pollo',
    plu: 'M16',
    price: '16.50',
    color: '#F3766F',
  },
]

function ProductList() {
  return (
    <View className='flex flex-row flex-wrap py-2 gap-x-2'>
      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          onPress={() => {}}
          className={`bg-[${product.color}] w-28 h-32 rounded-md p-2`}
        >
          <View className='flex flex-col justify-between h-full'>
            <Text className='text-white text-xs font-bold'>{product.name}</Text>
            <View className='flex flex-row justify-between'>
              <Text className='text-white text-xs'>{product.plu}</Text>
              <Text className='text-white text-xs'>{product.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}

function Categories() {
  return (
    <View className='flex flex-row gap-x-2'>
      <TouchableOpacity className='h-full p-2'>
        <View className='bg-[#323B45] w-16 h-20 flex items-center justify-center'>
          <FontAwesome size={20} name='glass' color='white' />
        </View>
        <Text className='text-white text-center pt-2 text-[8px]'>Bebidas</Text>
      </TouchableOpacity>
      <TouchableOpacity className='h-full p-2 bg-[#536EB5]'>
        <View className='bg-[#323B45] w-16 h-20 flex items-center justify-center'>
          <FontAwesome size={20} name='leaf' color='white' />
        </View>
        <Text className='text-white text-center pt-2 text-[8px]'>
          Principales
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className='h-full p-2'>
        <View className='bg-[#323B45] w-16 h-20 flex items-center justify-center'>
          <FontAwesome size={20} name='birthday-cake' color='white' />
        </View>
        <Text className='text-white text-center pt-2 text-[8px]'>Postres</Text>
      </TouchableOpacity>
    </View>
  )
}

export function HomeScreen() {
  return (
    <MenuProvider>
      <SafeAreaView className='flex flex-col h-full bg-[#050608]'>
        <View className='h-[6%]'>
          <View className='flex flex-row h-full'>
            <Button title='Hecho' color='#536EB5' />
            <FontAwesome.Button
              name='search'
              size={18}
              color='white'
              backgroundColor='transparent'
              className='flex flex-row items-center  px-1 py-3'
            >
              <Text className='text-white text-[10px]'>Buscar</Text>
            </FontAwesome.Button>
          </View>
        </View>
        <View className='flex flex-row items-center justify-center h-[94%]'>
          <View className='w-[6%] bg-[#222428]'>
            <LeftNavbar />
          </View>
          <View className='w-[94%] flex flex-col'>
            <View className='h-[85%] bg-[#17181C]'>
              <View className='flex-row'>
                <View className='w-[60%]'>
                  <View className='flex flex-col'>
                    <Menus />
                    <ProductList />
                  </View>
                </View>
                <View className='w-[40%]'>
                  <View className='h-full w-full flow bg-[#222428] p-2'>
                    <View className='flex flex-row items-center justify-between'>
                      <Text className='text-[#536EB5] text-xs'>Acciones</Text>
                      <Text className='text-[#68696B] text-[8px]'>
                        2019-04-23, 2:32 PM
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className='h-[15%] bg-[#050608]'>
              <Categories />
            </View>
          </View>
        </View>
        <StatusBar style='light' />
      </SafeAreaView>
    </MenuProvider>
  )
}
