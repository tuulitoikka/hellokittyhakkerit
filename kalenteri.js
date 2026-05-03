const weeklyContent = [
    {
        week: 1,
        image: "camping.jpg",
        text: "Retkeilytapahtuma Nuuksiossa! Ota kaverit ja lemppari eväät mukaan (ja juomista)."
    },
    {
        week: 2,
        image: "rantalentis.jpg",
        text: "Rantalentisturnaus Hietsussa!"
    },
    {
        week: 3,
        image: "approt.jpg",
        text: "Kesän Pinkit Approt ovat palanneet!"
    },
    {
        week: 4,
        image: "gym.jpg",
        text: "Kuntoiluviikko! Tule mukaan! Voit valita lenkkeilyn, pyöräilyn tai sali treenin. Tärkeintä on liikkua ja nauttia kesästä!"
    },
    {
        week: 5,
        image: "ruisrock.png",
        text: "Ruisrock 2026! Luvassa mahtavia esiintyjiä ja upeaa tunnelmaa!"
    },
    {
        week: 6,
        image: "flow festival.jpg",
        text: "Flow Festival 2026! Koe unohtumattomia musiikkielämyksiä Helsingin sydämessä!"
    },
    //lisää luukkuja ja voi olla mun mielestä eri järjestyksis vähä niiku joulukalenterissa. Muistakee laittaa toi oilkku ton } jäölkeenb
];

let checkedWeeks = [];

function init() {
    loadProgress();
    createDoors();

    document.getElementById('resetBtn').addEventListener('click', resetCalendar);
}


function createDoors() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    weeklyContent.forEach((content, index) => {
        const door = document.createElement('div');
        door.className = 'door';
        door.id = `door-${index}`;

        // tää tekee sen et pitää suorittaa se edellinen nii seuraavan luukun saa auki
        if (index === 0 || checkedWeeks.includes(index - 1)) {
            door.classList.add('unlocked');
        }

        if (checkedWeeks.includes(index)) {
            door.classList.add('checked');
        }

        door.innerHTML = `<div class="door-number">Viikko ${content.week}</div>`;

        if (checkedWeeks.includes(index)) {
            door.innerHTML += `<div class="checkmark">✓</div>`;
        }

        door.addEventListener('click', () => openDoor(index));
        calendar.appendChild(door);
    });
}

function openDoor(index) {
    const door = document.getElementById(`door-${index}`);

    //  avautuu vain jos on luuku on kiinni
    if (!door.classList.contains('unlocked') || door.classList.contains('checked')) {
        return;
    }

    const content = weeklyContent[index];
    document.getElementById('modalImage').src = content.image;
    document.getElementById('modalText').textContent = content.text;
    document.getElementById('modalCheckbox').checked = false;
    document.getElementById('continueBtn').disabled = true;

    document.getElementById('modal').classList.add('active');

    // kun suoritettu on klikattu nii "suoritettu" nappia pystyy painaa
    document.getElementById('modalCheckbox').addEventListener('change', function() {
        document.getElementById('continueBtn').disabled = !this.checked;
    }, { once: true });

    // kun suoritettu nappia painetaan
    document.getElementById('continueBtn').onclick = () => completeDoor(index);
}

function completeDoor(index) {
    document.getElementById('modal').classList.remove('active');

    // tehtävä suoritettu
    if (!checkedWeeks.includes(index)) {
        checkedWeeks.push(index);
    }

    saveProgress();
    createDoors();
}

function saveProgress() {
    localStorage.setItem('calendarProgress', JSON.stringify(checkedWeeks));
}

function loadProgress() {
    const saved = localStorage.getItem('calendarProgress');
    if (saved) {
        checkedWeeks = JSON.parse(saved);
    }
}

function resetCalendar() {
    if (confirm('Haluatko varmasti nollata kalenterin?')) {
        checkedWeeks = [];
        saveProgress();
        createDoors();
    }
}

document.addEventListener('DOMContentLoaded', init);