import { Component, OnInit } from '@angular/core';

const TASKS_KEY = 'tareas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Gestor de Tareas';
  tareas: string[] = [];
  nuevaTarea = '';
  expandedTaskIndex = -1;

  ngOnInit() {
    try {
      const tareasGuardadas = localStorage.getItem(TASKS_KEY);
      if (tareasGuardadas) {
        this.tareas = JSON.parse(tareasGuardadas);
      }
    } catch (error) {
      console.error('Error al cargar las tareas desde localStorage', error);
    }
  }

  // Cambia el estado de expansión de la tarea seleccionada
  toggleExpand(index: number) {
    this.expandedTaskIndex = this.expandedTaskIndex === index ? -1 : index;
  }

  // Devuelve true si la tarea seleccionada está expandida
  isExpanded(index: number) {
    return this.expandedTaskIndex === index;
  }

  // Agrega una nueva tarea a la lista y la guarda en localStorage
  agregarTarea() {
    if (this.nuevaTarea.trim() !== '') {
      this.tareas.push(this.nuevaTarea);
      this.nuevaTarea = '';
      localStorage.setItem(TASKS_KEY, JSON.stringify(this.tareas));
    }
  }

  // Elimina la tarea en el índice dado de la lista y actualiza localStorage
  eliminarTarea(index: number) {
    this.toggleExpand(index);
    this.tareas.splice(index, 1);
    localStorage.setItem(TASKS_KEY, JSON.stringify(this.tareas));
  }

  // Devuelve el número de caracteres restantes que el usuario puede ingresar
  get remainingCharacters() {
    return this.nuevaTarea.length;
  }
}
