export type PokemonData = {
	id: number;
	name: string;
	height: number;
	weight: number;
	base_experience: number;
	sprites: {
		other: {
			home: {
				front_default: string;
			};
		};
	};
	stats: [
		{
			base_stat: number;
			stat: {
				name: string;
			};
		}
	];
	abilities: [
		{
			ability: {
				name: string;
			};
		}
	];
};

export type PokemonResult = {
	name: string;
	url: string;
};

export type MapPin = {
	id: string;
	name: string;
	notes: string;
	coords: {
		latitude: number;
		longitude: number;
	};
};
