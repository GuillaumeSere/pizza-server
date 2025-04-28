
declare interface corsOptionsType {
	static origin: {	};

	static methods: (string | any)[];

	static allowedHeaders: (string | any)[];

	static credentials: boolean;
}
