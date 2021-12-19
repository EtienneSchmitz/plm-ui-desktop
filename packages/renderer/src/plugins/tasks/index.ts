import type { Task } from './types';

export abstract class Plugin {
    abstract readonly name: string;
}

export class TaskPlugin implements Plugin {
    readonly name: string = 'tasks';

    public tasks = [
        { id: 0, name: 'Finish the tutorial', description: '', completed: false },
        { id: 1, name: 'Buy groceries', description: 'Milk, Cheese, Pizza, Fruit, Tylenol', completed: false },
        { id : 2, name: 'Learn typescript', description: '', completed: false },
        { id: 3, name: 'Learn react', description: '', completed: false },
        { id : 4, name: 'Learn vue', description: '', completed: false },
        { id : 5, name: 'Learn angular', description: '', completed: false },
        { id: 6, name: 'Learn angular vue', description: '', completed: false },
    ] as Task[];


    display(): void {
        const m = document.getElementById('main');
        this.tasks.forEach(task => {
            const d = document.createElement('div');

            d.classList.add('task');

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = task.completed;
            input.id = task.id.toString();


            const p = document.createElement('p');
            p.innerHTML = task.name;
            p.classList.add('task-name');

            d.appendChild(input);
            d.appendChild(p);

            // const p2 = document.createElement('p');
            // p2.innerHTML = task.description;
            // p2.classList.add('task-description');
            // d.appendChild(p2);

            m?.appendChild(d);
        });

        return;
    }
}
