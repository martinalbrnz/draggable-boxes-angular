export interface Table {
	id: number
	seats: number
	posX: number
	posY: number
	width: number
	height: number
	shape: 'round' | 'square'
	[name: string]: any
}
