const Table = require('cli-table2');
const chalk = require('chalk');

class Node {
	constructor( data = null ) {
		this.data = data;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = new Node();
	}

	/* 1. Append item to the last of linked list */
	append( item ) {
		let current = this.head;
		let newNode = new Node(item)
		while( current.next !== null ) {
			current = current.next
		}
		current.next = newNode;
		return this.display();
	}	// </ Append>

	/* 2. Remove item from linked list */
	remove( item ) {
		if(!item) {
			console.log('No item to remove!'); 
			return false;
		}
		let current = this.head;
		while( current.next !== null ) {
			let previous = current;
			current = current.next;
			if( current.data === item ) {
				previous.next = current.next;
				return this.display();
			}
		}
		return false;
	}	// </ Remove>

	/* 3. Append item at perticulat index */
	appendAt( pos, item ) {
		if( pos >= this.length() || pos < 0) {
			console.log("ERROR: 'INSERT' position out of range! Use `append` instead");
			return false;
		}
		let counter = 0;
		let current = this.head;
		let newNode = new Node(item);
		while( current.next !== null ) {
			if( counter === pos ){
				newNode.next = current.next
				current.next = newNode
				return this.display();
			}
			current = current.next
			counter++;
		}
		return false;
	}	// </ appendAt>

	/* 4. Remove item at perticular index*/
	removeAt( pos ) {
		if( pos >= this.length() || pos < 0) {
			console.log("ERROR: 'REMOVE_AT' position out of range!");
			return false;
		}
		let counter = 0;
		let current = this.head;
		while( current.next !== null ) {
			let previous = current;
			current = current.next
			if( counter === pos ){
				previous.next = current.next;
				return this.display();
			}
			counter++;
		}
		return false;
	}	// </ removeAt>

	/* 5. Display linked list ( without style )*/
	display() {
		let current = this.head;
		let elements = [];
		while( current.next !== null ) {
			current = current.next
			elements.push( current.data );
		}
		return elements.join(" ");
	}	// </ Display>

	/* 6. Length/Size of linked list */
	length() {
		let current = this.head;
		let counter = 0;
		while( current.next !== null ) {
			counter++;
			current = current.next
		}
		return counter;
	}	// </ Length>

	/* 7. Check the list for empty or not */
	isEmpty() {
		return this.length() < 1
	}	// </ isEmpty>

	/* 8. Traverse a function over each item in the linked list */
	traverse( fn ) {
		if(!fn || typeof fn !== 'function') {
			console.log("ERROR: 'TRAVERSE' function is undefined!");
			return false;
		}
		let current = this.head;
		while( current.next !== null ) {
			current = current.next;
			fn(current)
		}
		return true;
	} 	// </ Traverse>

	/* 9. Reverse the linked list */
	reverse() {
		let current = this.head.next;
		let prev = null;
		let next;
        while(current !== null) {
            next = current.next
            current.next = prev
            prev = current
            current = next
        }
        let newHead = new Node();
        newHead.next = prev
        this.head = newHead
        return true
	}	// </ Reverse>

	/* 10. Swap two nodes inside linked list */
	swap( nodeOne, nodeTwo ) {
		let current = this.head;
		let counter = 0;
		let firstNode;

		// Make sure we are okay to go
		if( nodeOne === nodeTwo ) {
			console.log("ERROR: 'SWAP' both the nodes must be different!");
			return false;
		} else if( nodeOne > nodeTwo ) {
			let temp = nodeOne;
			nodeOne = nodeTwo;
			nodeTwo = temp;
		}

		if( nodeOne < 0 || nodeTwo < 0 ) {
			console.log("ERROR: 'SWAP' both the nodes must be index & index can not be negative!");
			return false;
		}

		// Swap nodes
		while( current !== null ) {
			current = current.next;
			if( counter == nodeOne ){
				firstNode = current;
			} else if( counter == nodeTwo ) {
				let temp = current.data;
				current.data = firstNode.data;
				firstNode.data = temp;
			}
			counter++;
		}
		return true
	}	// </ Swap>

	/* 
	* 	EXTRA 
	*/
	prettyPrint() {
		let current = this.head;
		let output = [ chalk.red('Head') + ' ->' ];
		while( current.next !== null ){
			current = current.next;
			output.push( chalk.cyan( current.data ) );
		}
		this.table( output );
		return true;
	}	// </ PrettyPrint>

	table( output ) {
		let table = new Table({
		  chars: { 'top': '─' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
		         , 'bottom': '─' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
		         , 'left': '│' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
		         , 'right': '│' , 'right-mid': '╢' , 'middle': '│' },
		   style:{ border:['yellow'] }
		});
		table.push( output);
		console.log(table.toString());
		return true
	} // </ Table>
}

module.exports = LinkedList