import type { Task } from './types';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

export abstract class Plugin {
    abstract readonly name: string;
}

export class TaskPlugin implements Plugin {
    readonly name: string = 'tasks';

    public tasks = [
        {
            id: 0,
            name: 'Finish the tutorial',
            description: '',
            completed: false,
        },
        {
            id: 1,
            name: 'Buy groceries',
            description: 'Milk, Cheese, Pizza, Fruit, Tylenol',
            completed: false,
        },
        { id: 2, name: 'Learn typescript', description: '', completed: false },
        { id: 3, name: 'Learn react', description: '', completed: false },
        { id: 4, name: 'Learn vue', description: '', completed: false },
        { id: 5, name: 'Learn angular', description: '', completed: false },
        { id: 6, name: 'Learn angular vue', description: '', completed: false },
        {
            id: 7,
            name: 'Learn fonts in Google Fonts',
            description: '',
            completed: false,
        },
    ] as Task[];

    display(): void {
        const m = document.getElementById('main');

        const div = document.createElement('div');
        div.className = 'task-list';

        const h2 = document.createElement('h2');
        h2.innerText = 'Liste de tâches';

        div.appendChild(h2);

        this.tasks.forEach((task) => {
            const d = document.createElement('div');

            d.classList.add('task');

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = task.completed;
            input.id = task.id.toString();

            const dtask = document.createElement('div');
            dtask.className = 'task-content';

            const p = document.createElement('p');
            p.innerHTML = task.name;
            p.classList.add('task-name');
            dtask.appendChild(p);

            if (task.description != '') {
                const p2 = document.createElement('p');
                p2.innerHTML = task.description;
                p2.classList.add('task-description');
                dtask.appendChild(p2);
            }

            d.appendChild(input);
            d.appendChild(dtask);

            div.appendChild(d);
        });
        const btn = document.createElement('button');
        const icon = document.createElement('i');
        icon.className = 'fas fa-plus';
        btn.appendChild(icon);

        const p = document.createElement('p');
        p.classList.add('add-task');
        p.innerText = 'Ajouter une tâche';
        btn.appendChild(p);

        btn.addEventListener('click', () => {
            console.log('click task');
        });
        div.appendChild(btn);

        m?.appendChild(div);


        return;
    }
}
