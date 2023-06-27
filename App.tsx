import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import FavoritePokemonList from './components/FavoritePokemonList';
import PokemonMap from './components/PokemonMap';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Pokédex" component={PokemonList} />
			<Tab.Screen name="Favorites" component={FavoritePokemonList} />
			<Tab.Screen name="Map" component={PokemonMap} />
		</Tab.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="HomeScreen"
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="PokemonDetails"
					component={PokemonDetails}
					options={{ title: 'Pokemon Details' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
