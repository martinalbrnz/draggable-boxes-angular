import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { tablesMock } from 'src/app/constants/mock';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {

  tables = tablesMock
  maxWidth = 700
  maxHeight = 500
  editMode = false

  selectedTable?: number

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (e.ctrlKey) {
      this.tables = this.tables.map((table) => {
        if (table.id === this.selectedTable) {
          return {
            ...table,
            posX: this.calculatePosition(table.posX, e.movementX, table.height, this.maxWidth),
            posY: this.calculatePosition(table.posY, e.movementY, table.width, this.maxHeight),
          }
        }
        return table
      })
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp() {
    this.selectedTable = undefined
  }

  selectTable(id: number) {
    this.selectedTable = id
  }

  calculatePosition(position: number, movement: number, size: number, max: number): number {
    const inside = this.isInside(position, movement, size, max)
    if (inside) {
      return position + movement
    } else {
      if (position + movement <= 0) {
        return 0
      } else {
        return max - size
      }
    }
  }

  isInside(position: number, movement: number, size: number, max: number): boolean {
    return (position + movement + size) < max && position + movement > 0
  }

  toggleEditMode() {
    this.editMode = !this.editMode
  }

  toggleShape(id: number) {
    this.tables = this.tables.map((table) => {
      if (table.id === id) {
        return {
          ...table,
          shape: table.shape === 'round' ? 'square' : 'round'
        }
      }
      return table
    })
  }

  addTable() {
    const id = this.tables.reduce((prev, curr) => {
      return prev <= curr.id ? curr.id + 1 : prev
    }, 1)
    this.tables.push({
      id,
      seats: 2,
      posX: 100,
      posY: 100,
      width: 100,
      height: 100,
      shape: 'square',
    },)
  }
}
