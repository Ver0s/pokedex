import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import FavoritePokemonList from './components/FavoritePokemonList';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function PokemonMap() {
	return <Text>Pokemon map</Text>;
}

function HomeScreen() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Pokédex" component={PokemonList} />
			<Stack.Screen
				name="PokemonDetails"
				component={PokemonDetails}
				options={{ title: 'Pokemon Details' }}
			/>
		</Stack.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name="Home Screen"
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
				<Tab.Screen name="Favorites" component={FavoritePokemonList} />
				<Tab.Screen name="Map" component={PokemonMap} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
